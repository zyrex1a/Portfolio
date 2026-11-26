# How to customize your portfolio

Thank you for your purchase! No installation or build tools needed: it is plain HTML, CSS and JavaScript.

This is a multipurpose personal portfolio. It can be adapted for developers, designers, photographers, architects, marketers, consultants, writers and other freelancers by replacing the example content in `editor.html`. Rename “Projects”, “Skills” and “Services” in the advanced UI fields when a profession uses different wording.

## What's inside

| File | What you do with it |
|------|---------------------|
| `editor.html` | **Easiest way.** A visual editor: fill in the fields, no code |
| `config.js` | Your content file (the editor creates a new one for you) |
| `style.css` | Optional. Colors and fonts (top of the file) |
| `index.html`, `script.js` | Do not edit. They build the page from `config.js` |

## 1. Preview the site

Double-click `index.html`. It opens in your browser. Keep all files in the same folder.

## 2. Change your content, no code needed (editor.html)

1. Open `editor.html` in Chrome, Edge or Firefox (double-click it).
2. Fill in the fields on the left. The page on the right updates as you type. Use **+ Add** and **Remove** to manage projects, services, questions and so on.
3. Upload your photo and project pictures with the file buttons. They are resized automatically.
4. Click **Download config.js**.
5. Put the downloaded `config.js` in your site folder and replace the old one. Open `index.html` to see the result.

Do not upload `editor.html` to your website. It is only for you.

## 2b. Change your content by hand (config.js)

Prefer to edit the file yourself? Open `config.js` in a text editor.

Open `config.js` in a text editor (VS Code or Notepad++ are free). Replace the example text between the quotes `"..."`.

- `name`, `hero`, `about`: your name, role, stats, badges and facts. Put your photo in the `images` folder and set `photo: "images/me.jpg"` (a portrait about 800 × 1000 px). Leave `""` to show your initials.
- `projects`: copy one `{ ... },` block to add a project, delete one to remove it. The first project is displayed larger.
- `palette`: one word changes the whole color scheme: `"violet"`, `"ocean"`, `"coral"` or `"emerald"`.
- `tech`, `services`, `process`, `skills`, `experience`, `testimonials`, `faq`, `contact`, `social`: same idea. Add or delete items freely.
- `diplomas`: add diplomas or certificates and upload each document as an image or PDF in `editor.html`. Visitors can open or download the attached document.
- To hide a whole section, delete its items (for example `faq: []`) and remove its name from `ui.nav`.
- `seo`: the title and description shown on Google. Important!
- `ui`: menu, button and form text. Translate these to change the site language (also set `lang`, e.g. `"fr"`).

Tip: keep every quote `"` and comma `,`. If the page goes blank, a quote or comma is missing near your last change.

## 3. Add project images

1. Create an `images` folder next to `index.html` and put your pictures inside (about 1600 × 1000 px, under 300 KB).
2. In `config.js`, set `image: "images/my-project.jpg"` for that project. Leave `""` to keep the colored placeholder.

## 4. Change colors and fonts (optional)

Open `style.css`. The first block (`CUSTOMIZE HERE`) contains every color and font.

- `--accent` is the main color. Try `#2f4bff` (blue) or `#c2410c` (orange).
- For a new font, pick one on [fonts.google.com](https://fonts.google.com), replace the Google Fonts `<link>` in `index.html`, then update `--font-display` and `--font-body`.

## 5. Make the contact form work

1. Create a free form at [formspree.io](https://formspree.io).
2. Paste its URL in `contact.formAction` in `config.js`.

## 6. Publish your site

Upload the whole folder to Netlify, GitHub Pages, Cloudflare Pages or any web hosting.

## Support

Questions? Message me on Etsy and I will reply within 24 hours.
