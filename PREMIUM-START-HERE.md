# Zakaria · Premium portfolio

Open index.html to view the portfolio. Upload all files together to Netlify or any static hosting service. No build step is required. Internet is only needed for the optional Google Fonts; system fonts work offline.

## Personalize before publishing
Open editor.html. Your existing portrait is preserved. Edit content and upload certificates, then download config.js and replace the file beside index.html. Publish the updated folder. Editor changes are local; visitors cannot change the published site.

- Replace hello@example.com with your actual email. The contact form remains disabled while the placeholder is present. Without a form endpoint, submitting opens the visitor’s email application; it does not send email directly.
- Add real GitHub/social links. Empty links are displayed as “Coming soon”.
- Three project cards are clearly identified as concept examples. Replace them with your own projects and screenshots.
- The ISTA qualification is listed as in progress. Upload only actual earned certificates. No certificate documents were included in the original ZIP.
- Template client counts, fabricated testimonials and agency employment have been removed.

## Design
Dark-first ivory/lime identity, alternative light theme, responsive navigation, perspective card interactions, orbit decoration, scroll reveals and moving technology strip. Reduced-motion preferences disable animations; pointer tilt only runs on devices with a fine pointer. All effects use CSS and vanilla JavaScript.

Files premium.css and premium.js extend the original rendering system. Keep them alongside style.css and script.js. The original image remains embedded in config.js for portability.

## Background and scrolling update
In editor.html → General, select Background style: Studio, Aurora, Architect grid, Sand, or Custom. For Custom, upload your own image in Custom background image. Switch the color palette independently. Preview updates immediately; download config.js, replace it, and re-upload the folder to publish. Uploaded images are saved in config.js.

Scrolling retains the native mouse-wheel behavior, with lightweight portrait parallax on desktop, scroll reveals, a progress line and a back-to-top button. Reduced-motion preferences disable parallax and animated scrolling. The portrait uses a clean rectangular frame.

## Custom cursor and 3D scene
The desktop mouse arrow is replaced by a precise accent dot and smooth trailing ring. Links enlarge the ring; text fields show a slim caret. Native cursor is restored when leaving the page, losing focus or switching to touch. The hero includes a six-face rotating cube, shaded sphere and perspective ring responding to mouse movement. Reduced motion disables rotation and trailing motion. These are CSS 3D objects, requiring no external libraries.

## Coding and design visual update
The abstract 3D shapes have been replaced by a decorative code-editor panel and a design-system card with typography, color swatches and layout blocks. Both respond to the mouse in perspective. Their text is decorative, not an executable editor. The custom cursor and editable backgrounds are preserved.

## Depth edition
A new architectural 3D background uses a perspective grid, layered translucent plane and soft lighting. The portrait uses a simple rectangular frame. Floating cards and portrait tilt are removed; section reveals and restrained hover effects remain. Custom cursor, editable content and all background presets are preserved. Select Depth in editor.html to use this background.

## Circular interactive edition
Portrait now uses a circular crop and layered 3D rim. Move the mouse over the hero to rotate the portrait and its circular background plane; the light position follows the pointer. Leaving the hero resets the tilt. Reduced-motion preferences disable this response; touch retains a static circular design.

## Card effects and document preview
Cards respond to clicks with a subtle press and ripple. Uploaded certificate images open in a zoom dialog; PDF certificates offer an original-document link. Close with the close button, Escape or outside click. Preview is available only for uploaded documents; placeholders do not pretend to contain certificates. Reduced-motion preferences disable the animations.

## Full Stack identity and project details
Profile now describes Full Stack Development and second-year studies at ISTA Azilal. Every project opens a details dialog from the card or View project details button. The dialog contains its image, details, features, technology tags and real HTTP(S) links. Existing direct links still open the destination.

Use editor.html → Projects: upload Image, fill Details and Features, and add Links with label and URL (live site or GitHub). Empty links are never replaced by invented destinations. Three concept projects remain samples until you replace them. Certificates open from the uploaded image or document link.

## Certificats PDF (correctif)
- Un certificat PDF affiche maintenant son image (1re page) dans la carte et dans la fenêtre de zoom. Le dossier `vendor/` (pdf.js, copie locale) doit être publié avec le reste du site.
- L'aperçu image des PDF demande un site servi en http(s) (Netlify, GitHub Pages…). En ouvrant `index.html` par double-clic (file://), le navigateur bloque pdf.js : la carte garde l'icône PDF et la fenêtre affiche le PDF avec le lecteur du navigateur.
- « Open original document » ouvre le PDF via un Blob (Chrome bloquait les liens `data:`).
- La souris reste visible dans la fenêtre de zoom.
