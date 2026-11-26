// Apply the saved (or system) theme immediately to avoid a flash on load
(function () {
  var saved = null;
  try { saved = localStorage.getItem("theme"); } catch (e) {}
  var dark = saved ? saved === "dark" : true;
  document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
  if (typeof SITE !== "undefined" && SITE.palette) document.documentElement.setAttribute("data-palette", SITE.palette);
})();

// Build the page from config.js (you do not need to edit this file)
document.addEventListener("DOMContentLoaded", function () {
  function $(id) { return document.getElementById(id); }
  function text(id, value) { $(id).textContent = value; }
  function h(tag, cls, txt) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (txt !== undefined) n.textContent = txt;
    return n;
  }
  function link(label, url, cls) {
    var a = h("a", cls, label);
    a.href = url;
    if (/^(https?:|data:)/.test(url)) { a.target = "_blank"; a.rel = "noopener"; }
    return a;
  }
  function add(parent) {
    for (var i = 1; i < arguments.length; i++) parent.appendChild(arguments[i]);
    return parent;
  }
  function initials(s) { return s.split(" ").map(function (w) { return w.charAt(0); }).slice(0, 2).join("").toUpperCase(); }

  var calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var revealer = null, spy = null;

  function render(S, live) {
    var ui = S.ui;
    window.activePortfolio = S;
    document.documentElement.dataset.background = S.backgroundStyle || "studio";
    document.documentElement.style.setProperty("--user-background", S.backgroundImage ? "url(" + JSON.stringify(S.backgroundImage) + ")" : "none");
    ["nav", "stats", "facts", "project-list", "skill-list", "diploma-list", "quote-list", "service-list", "step-list", "timeline", "faq-list", "track", "social"].forEach(function (id) {
      var box = $(id);
      while (box.firstChild) box.removeChild(box.firstChild);
    });

    document.documentElement.lang = S.lang;
    if (S.palette) document.documentElement.setAttribute("data-palette", S.palette);
    document.title = S.seo.title;
    document.querySelector('meta[name="description"]').setAttribute("content", S.seo.description);
    document.querySelector('meta[property="og:title"]').setAttribute("content", S.seo.title);
    document.querySelector('meta[property="og:description"]').setAttribute("content", S.seo.description);

    // Header, hero
    text("brand", S.name);
    text("skip", ui.skip);
    ui.nav.forEach(function (k) { $("nav").appendChild(link(ui.titles[k], "#" + k)); });
    Object.keys(ui.titles).forEach(function (k) { if ($("t-" + k)) text("t-" + k, ui.titles[k]); });
    text("hello", S.hero.greeting);
    text("name", S.name);
    text("role", S.hero.role);
    text("lead", S.hero.lead);
    text("btn-work", ui.buttons.work);
    text("btn-contact", ui.buttons.contact);
    S.hero.stats.forEach(function (st) {
      $("stats").appendChild(add(h("div"), h("strong", "", st.value), h("span", "", st.label)));
    });
    text("badge-1", S.hero.badges[0] || "");
    text("badge-2", S.hero.badges[1] || "");
    var photo = $("photo"), old = photo.querySelector("img, .initials");
    while (old) { photo.removeChild(old); old = photo.querySelector("img, .initials"); }
    if (S.hero.photo) {
      var me = h("img"); me.src = S.hero.photo; me.alt = S.name;
      photo.insertBefore(me, photo.firstChild);
    } else {
      photo.insertBefore(h("span", "initials", initials(S.name)), photo.firstChild);
    }

    // About
    text("about-headline", S.about.headline);
    text("about-text", S.about.text);
    S.about.facts.forEach(function (f) {
      $("facts").appendChild(add(h("div"), h("dt", "", f.label), h("dd", "", f.value)));
    });

    // Tech strip (list is doubled for a seamless loop)
    [0, 1].forEach(function () {
      S.tech.forEach(function (t) { $("track").appendChild(h("span", "", t)); });
    });

    S.services.forEach(function (v) {
      $("service-list").appendChild(add(h("article", "service"), h("div", "icon", v.icon), h("h3", "", v.title), h("p", "", v.description)));
    });

    // Projects
    S.projects.forEach(function (p) {
      var thumb = h("div", "thumb");
      if (p.image) {
        var img = h("img");
        img.src = p.image; img.alt = p.title;
        thumb.appendChild(img);
      } else {
        var mock = h("div", "mock");
        for (var m = 0; m < 4; m++) mock.appendChild(h("i"));
        thumb.appendChild(mock);
      }
      var tags = h("ul", "tags");
      (p.tags || []).forEach(function (t) { tags.appendChild(h("li", "", t)); });
      var links = h("p", "links");
      (p.links || []).forEach(function (l) { links.appendChild(link(l.label, l.url)); });
      var body = add(h("div", "pbody"), h("h3", "", p.title), h("p", "", p.description), tags, links);
      $("project-list").appendChild(add(h("article", "project"), thumb, body));
    });

    S.process.forEach(function (v, i) {
      $("step-list").appendChild(add(h("div", "step"), h("span", "num", String(i + 1)), h("h3", "", v.title), h("p", "", v.description)));
    });

    // Skills
    S.skills.forEach(function (g) {
      var ul = h("ul");
      g.items.forEach(function (i) { ul.appendChild(h("li", "", i)); });
      $("skill-list").appendChild(add(h("div"), h("h3", "", g.group), ul));
    });

    // Diplomas and certificates: upload an image or PDF from editor.html.
    (S.diplomas || []).forEach(function (d) {
      var visual = h("div", "diploma-visual");
      var isImage = d.document && (/^data:image\//.test(d.document) || /\.(png|jpe?g|webp|gif|svg)(?:[?#].*)?$/i.test(d.document));
      if (isImage) {
        var diplomaImage = h("img");
        diplomaImage.src = d.document; diplomaImage.alt = d.title;
        visual.appendChild(diplomaImage);
      } else {
        visual.appendChild(h("span", "diploma-icon", d.document ? "PDF" : "🎓"));
      }
      var meta = add(h("div", "diploma-meta"), h("span", "diploma-year", d.year), h("span", "", d.institution));
      var diplomaBody = add(h("div", "diploma-body"), meta, h("h3", "", d.title), h("p", "", d.description));
      if (d.document) diplomaBody.appendChild(link(d.button || "View document", d.document, "diploma-link"));
      $("diploma-list").appendChild(add(h("article", "diploma-card"), visual, diplomaBody));
    });

    S.experience.forEach(function (j) {
      $("timeline").appendChild(add(h("article", "job"), h("span", "when", j.period), h("h3", "", j.role), h("p", "co", j.company), h("p", "", j.description)));
    });

    // Testimonials
    S.testimonials.forEach(function (t) {
      var foot = add(h("footer"), h("span", "avatar", initials(t.author)), h("span", "", t.author));
      $("quote-list").appendChild(add(h("blockquote"), h("p", "", t.quote), foot));
    });

    S.faq.forEach(function (f) {
      $("faq-list").appendChild(add(h("details"), h("summary", "", f.q), h("p", "", f.a)));
    });

    // Contact
    text("contact-lead", S.contact.lead);
    var mail = $("mail");
    mail.textContent = S.contact.email;
    mail.href = "mailto:" + S.contact.email;
    $("form").action = S.contact.formAction || "";
    text("l-name", ui.form.name);
    text("l-email", ui.form.email);
    text("l-message", ui.form.message);
    text("send", ui.buttons.send);

    // Footer
    text("copy", "© " + new Date().getFullYear() + " " + S.name);
    S.social.forEach(function (s) { $("social").appendChild(link(s.label, s.url)); });

    // Fade cards in as they scroll into view
    if (revealer) revealer.disconnect();
    if (!live && !calm && "IntersectionObserver" in window) {
      revealer = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); revealer.unobserve(e.target); } });
      }, { threshold: 0.12 });
      document.querySelectorAll(".project, .service, .step, .skills > div, blockquote, .facts div, .job, details").forEach(function (c) {
        c.classList.add("reveal"); revealer.observe(c);
      });
    }

    // Highlight the menu link of the section being read
    if (spy) spy.disconnect();
    if ("IntersectionObserver" in window) {
      var navLinks = {};
      document.querySelectorAll("#nav a").forEach(function (a) { navLinks[a.getAttribute("href").slice(1)] = a; });
      spy = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (!e.isIntersecting) return;
          Object.keys(navLinks).forEach(function (k) { navLinks[k].classList.remove("on"); });
          navLinks[e.target.id].classList.add("on");
        });
      }, { rootMargin: "-40% 0px -55% 0px" });
      Object.keys(navLinks).forEach(function (k) { if ($(k)) spy.observe($(k)); });
    }
  }

  if (typeof SITE === "undefined") { console.error("config.js is missing or has a syntax error."); return; }
  render(SITE, false);

  // Live preview: editor.html sends the edited content to this page
  window.addEventListener("message", function (e) {
    if (e.source === window.parent && e.data && e.data.type === "site") render(e.data.site, true);
  });

  // Scroll progress bar
  var bar = $("bar");
  window.addEventListener("scroll", function () {
    var max = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (max > 0 ? window.scrollY / max * 100 : 0) + "%";
  }, { passive: true });

  // Theme switch
  $("theme").addEventListener("click", function () {
    var root = document.documentElement;
    var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("theme", next); } catch (e) {}
  });

  // Contact form: use Formspree when configured, otherwise open the visitor's email app.
  $("form").addEventListener("submit", function (e) {
    if (SITE.contact.formAction && SITE.contact.formAction.trim()) return;
    e.preventDefault();
    var fd = new FormData(this);
    var subject = "Portfolio message from " + (fd.get("name") || "a visitor");
    var body = "Name: " + (fd.get("name") || "") + "\nEmail: " + (fd.get("email") || "") + "\n\n" + (fd.get("message") || "");
    $("form-status").textContent = "Opening your email app…";
    window.location.href = "mailto:" + encodeURIComponent(SITE.contact.email) + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
  });
});
