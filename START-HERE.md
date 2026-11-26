# ابدأ من هنا — دليل سريع

هاد القالب ما كيحتاج لا تثبيت لا برمجة باش تبدّل المعلومات.

## تخصيص الـPortfolio

1. حل `editor.html` فـ Chrome ولا Edge.
2. بدّل الاسم، النبذة، المهارات، المشاريع والروابط.
3. حمّل الصورة الشخصية وصور المشاريع من داخل المحرّر.
4. كليكي على **Download config.js**.
5. عوّض `config.js` القديم بالملف الجديد اللي تحمّل.
6. حل `index.html` باش تشوف النتيجة النهائية.

المحرّر كيحفظ المسودة تلقائياً فالمتصفح. زر **Reset demo** كيرجّع معلومات المثال.

## فورم التواصل

- بلا إعداد: الفورم كيفتح تطبيق البريد ديال الزائر ويرسل للعنوان الموجود في `contact.email`.
- للإرسال المباشر من الموقع: صايب Formspree form وحط الرابط ديالو فـ `contact.formAction` داخل `config.js`.

## نشر الموقع وإعطاء الرابط للزبون

أسهل طريقة هي Netlify Drop:

1. دخل لـ `https://app.netlify.com/drop`.
2. جرّ فولدر المشروع كامل للصفحة.
3. غادي يعطيك رابط مباشر بحال `client-name.netlify.app`.
4. من إعدادات Netlify تقدر تبدّل اسم الرابط أو تربط دومين خاص.

الأفضل يكون حساب الاستضافة باسم الزبون. عطِيه الرابط النهائي ومعاه نسخة ZIP من الملفات.

## شنو تسلّم للزبون؟

- رابط الموقع المنشور.
- ZIP فيه ملفات الموقع كاملة.
- هاد الدليل و`README.md`.
- معلومات الدخول للاستضافة إلا كان الحساب تدار باسمو.

ما ترفعش `editor.html` فالموقع المنشور؛ خليه غير داخل نسخة ZIP اللي غادي تسلّم للزبون.

---

# Démarrage rapide

1. Ouvrez `editor.html` dans Chrome ou Edge.
2. Modifiez les informations et importez les images.
3. Cliquez sur **Download config.js**.
4. Remplacez l'ancien `config.js` par le nouveau.
5. Ouvrez `index.html` pour vérifier le résultat.
6. Publiez le dossier sur Netlify, GitHub Pages ou votre hébergeur.

Pour le formulaire, laissez `formAction` vide afin d'utiliser l'application e-mail du visiteur, ou ajoutez une URL Formspree pour recevoir les messages directement.
