Simple static site for Malik (12) — Arabic default with Indonesian and English translations.

Files added:
- index.html — main page (Arabic default). Uses `data-i18n` attributes and `script.js` for switching languages.
- styles.css — basic styling and RTL support.
- script.js — translations and language switcher; remembers language in localStorage.

How to open
1. Open `c:\Data\Proj\Cerbon\malik-web\index.html` in a browser (double-click or use "Open File").

Optional: run a local server (recommended for some browsers):

PowerShell:

```powershell
cd 'c:\Data\Proj\Cerbon\malik-web'
python -m http.server 8000
# then open http://localhost:8000 in your browser
```

Notes
- The site deliberately avoids providing hacking instructions. It mentions ethical cybersecurity so Malik can learn to protect systems and help others.
- If you want images, a custom domain, or a version deployed online (GitHub Pages), tell me and I can add steps to deploy.
