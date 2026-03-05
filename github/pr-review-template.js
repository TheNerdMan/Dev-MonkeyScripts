// ==UserScript==
// @name         GitHub PR Review Template Button
// @namespace    https://github.com/
// @version      1.2
// @match        https://github.com/*/pull/*
// @grant        none
// @author       TheNerdMan
// @description  Adds a button to quickly paste a PR review template into the comment box, with customizable content stored in localStorage. This script is designed to help reviewers quickly structure their feedback with a single click, while still allowing for customization of the template content.
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

  function setTemplate(template) {
    localStorage.setItem(STORAGE_KEY, template);
  }

  function showToast(message) {
    const toast = document.createElement("div");
    toast.textContent = message;
    Object.assign(toast.style, {
      position: "fixed",
      top: "20px",
      right: "20px",
      backgroundColor: "#2ea44f",
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

  function insertTemplate() {
    const textarea = document.querySelector(
      'textarea[placeholder="Leave a comment"]',
    );
    if (!textarea) return;
    textarea.value = getTemplate();
    showToast("✅ Template pasted");
  }

  function openSettingsModal() {
    if (document.getElementById("pr-template-modal")) return; // already open

    const modal = document.createElement("div");
    modal.id = "pr-template-modal";
    Object.assign(modal.style, {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0,0,0,0.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 9999,
    });

    const box = document.createElement("div");
    Object.assign(box.style, {
      backgroundColor: "#fff",
      padding: "20px",
      borderRadius: "8px",
      width: "500px",
      maxWidth: "90%",
      boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
      display: "flex",
      flexDirection: "column",
    });

    const textarea = document.createElement("textarea");
    textarea.value = getTemplate();
    Object.assign(textarea.style, {
      width: "100%",
      height: "250px",
      marginBottom: "12px",
      fontFamily: "monospace",
      fontSize: "14px",
    });

    const btnContainer = document.createElement("div");
    btnContainer.style.display = "flex";
    btnContainer.style.justifyContent = "flex-end";
    btnContainer.style.gap = "8px";

    const saveBtn = document.createElement("button");
    saveBtn.textContent = "Save";
    Object.assign(saveBtn.style, {
      padding: "6px 12px",
      backgroundColor: "#2ea44f",
      color: "white",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
    });
    saveBtn.addEventListener("click", () => {
      setTemplate(textarea.value);
      document.body.removeChild(modal);
      showToast("⚙️ Template updated");
    });

    const cancelBtn = document.createElement("button");
    cancelBtn.textContent = "Cancel";
    Object.assign(cancelBtn.style, {
      padding: "6px 12px",
      backgroundColor: "#d73a49",
      color: "white",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
    });
    cancelBtn.addEventListener("click", () => {
      document.body.removeChild(modal);
    });

    btnContainer.appendChild(cancelBtn);
    btnContainer.appendChild(saveBtn);
    box.appendChild(textarea);
    box.appendChild(btnContainer);
    modal.appendChild(box);
    document.body.appendChild(modal);
  }

  function createSplitButton() {
    const xpath =
      "/html/body/div[1]/div[6]/div/main/turbo-frame/div/react-app/div/div/div/div/div/section/div[2]/div[5]/div/div/div[1]";
    const container = document.evaluate(
      xpath,
      document,
      null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null,
    ).singleNodeValue;
    if (!container) return;

    if (container.querySelector(".pr-template-split-button")) return;

    const wrapper = document.createElement("div");
    wrapper.className = "pr-template-split-button d-flex";
    wrapper.style.display = "inline-flex";
    wrapper.style.borderRadius = "6px";
    wrapper.style.overflow = "hidden";
    wrapper.style.fontSize = "14px";

    function styleButton(btn, minWidth) {
      btn.className =
        "prc-Button-ButtonBase-9n-Xk prc-Button-IconButton-fyge7 btn-sm";
      Object.assign(btn.style, {
        padding: "3px 0px", // GitHub-style small padding
        border: "none",
        cursor: "pointer",
        fontWeight: "bold",
        minWidth: minWidth, // optional, works for the settings ⚙ icon
        textAlign: "center",
      });
    }

    const pasteBtn = document.createElement("button");
    pasteBtn.textContent = "Paste Template";
    styleButton(pasteBtn, "6rem");
    pasteBtn.addEventListener("click", insertTemplate);

    const settingsBtn = document.createElement("button");
    settingsBtn.textContent = "⚙";
    styleButton(settingsBtn, "3rem");
    settingsBtn.addEventListener("click", openSettingsModal);

    wrapper.appendChild(pasteBtn);
    wrapper.appendChild(settingsBtn);
    container.appendChild(wrapper);
  }

  // Initial attempt
  createSplitButton();

  // Observe DOM in case container loads dynamically
  const observer = new MutationObserver(() => createSplitButton());
  observer.observe(document.body, { childList: true, subtree: true });
})();
