# Dev-MonkeyScripts 🐒

A collection of userscripts (GreaseMonkey/TamperMonkey/ViolentMonkey) to enhance web development workflows across different platforms. Each website has its own folder containing relevant scripts.

## 📁 Project Structure

```
Dev-MonkeyScripts/
├── README.md
└── github/                 # GitHub enhancement scripts
    ├── pr-review-template-auto.js
    ├── pr-review-template.js
    └── quick-selection-bullets.js
```

## 🚀 Installation

1. Install a userscript manager:
   - [Tampermonkey](https://www.tampermonkey.net/) (Recommended)
   - [Greasemonkey](https://www.greasespot.net/) (Firefox)
   - [Violentmonkey](https://violentmonkey.github.io/)

2. Click the "Raw" button on any `.js` file in this repository
3. Your userscript manager should automatically detect and offer to install the script
4. Click "Install" to add the script

## 🛠️ Development

### Adding New Scripts

1. Create a folder for the target website (e.g., `gitlab/`, `bitbucket/`)
2. Add your userscript files with proper metadata headers:

```javascript
// ==UserScript==
// @name         Your Script Name
// @namespace    https://example.com/
// @version      1.0
// @match        https://target-site.com/*
// @grant        none
// ==/UserScript==
```

## 🤝 Contributing

1. Fork the repository
2. Create a new folder for your target website if it doesn't exist
3. Add your userscript with proper documentation
4. Update this README with script details
5. Submit a pull request

## 📄 License

This project is open source. Feel free to use, modify, and distribute these scripts.

## 🐛 Issues & Support

If you encounter any issues or have feature requests:

1. Check if the userscript manager is up to date
2. Verify the target website hasn't changed their UI
3. Check browser console for JavaScript errors
4. Create an issue in this repository with details

---

**Happy scripting!** 🚀
