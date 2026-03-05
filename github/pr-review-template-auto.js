// ==UserScript==
// @name         GitHub PR Review Template Auto-Inserter
// @namespace    https://github.com/
// @version      1.1
// @match        https://github.com/*/pull/*
// @grant        none
// ==/UserScript==

(() => {
  const STORAGE_KEY = "github_pr_template";

  const DEFAULT_TEMPLATE = `## PR Review ✅ / ❌

Something something yay

---
Bugs found:
<details>
<summary>🐛 A bug that has images or videos</summary>
</details>

- 🐛
---
Suggestions:
- 💡
---
Questions:
- ❓
---
Nitpicks:
- ☝️🤓
`;

  function getTemplate() {
    return localStorage.getItem(STORAGE_KEY) || DEFAULT_TEMPLATE;
  }

  function showToast(message) {
    const toast = document.createElement("div");
    toast.textContent = message;
    Object.assign(toast.style, {
      position: "fixed",
      top: "20px",
      right: "20px",
      backgroundColor: "#28a745",
      color: "white",
      padding: "10px 15px",
      borderRadius: "5px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
      zIndex: 9999,
      fontFamily: "sans-serif",
      fontSize: "14px",
    });
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2000);
  }

  function tryInsertTemplate() {
    const textarea = document.querySelector(
      'textarea[placeholder="Leave a comment"]',
    );
    if (!textarea) return false;

    if (textarea.value.trim() === "") {
      textarea.value = getTemplate();
      showToast("✅ PR review template inserted");
      return true;
    }

    return true; // Found it, but no action needed
  }

  // Debounce helper
  function debounce(func, wait) {
    let timeout;
    return () => {
      clearTimeout(timeout);
      timeout = setTimeout(func, wait);
    };
  }

  // Try immediately
  if (tryInsertTemplate()) return;

  // Observe DOM changes with debounce
  const observer = new MutationObserver(
    debounce(() => {
      if (tryInsertTemplate()) {
        observer.disconnect();
      }
    }, 1000),
  ); // ms debounce

  observer.observe(document.body, { childList: true, subtree: true });
})();
