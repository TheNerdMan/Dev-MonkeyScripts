// ==UserScript==
// @name         GitHub Review Section Quick Bullets
// @namespace    https://github.com/
// @version      1.2
// @match        https://github.com/*/pull/*
// @grant        none
// @author       TheNerdMan
// @description  Adds quick selection bullets to the GitHub PR review section for structured reviews.
// ==/UserScript==

(() => {
  const BUTTON_CLASS = "gh-review-quick-bullets";

  const SECTIONS = [
    { emoji: "🐛", label: "Bug" },
    { emoji: "💡", label: "Suggestion" },
    { emoji: "❓", label: "Question" },
    { emoji: "☝️🤓", label: "Nitpick" },
  ];

  function insertBullet(textarea, emoji) {
    if (!textarea) return;

    const bullet = `- ${emoji}`;
    const start = textarea.selectionStart ?? textarea.value.length;
    const end = textarea.selectionEnd ?? textarea.value.length;

    const before = textarea.value.substring(0, start);
    const after = textarea.value.substring(end);

    const needsNewline = before.length > 0 && !before.endsWith("\n");

    const insertion = (needsNewline ? "\n" : "") + bullet;

    textarea.value = before + insertion + after;

    const newCursor = before.length + insertion.length;
    textarea.setSelectionRange(newCursor, newCursor);
    textarea.focus();

    textarea.dispatchEvent(new Event("input", { bubbles: true }));
  }

  function createButton(emoji, label, textarea) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.title = label;

    // GitHub button classes
    btn.className = `
      prc-Button-ButtonBase-9n-Xk
      prc-Button-IconButton-fyge7
      btn-sm
    `;

    btn.setAttribute("data-no-visuals", "true");
    btn.setAttribute("data-size", "small");
    btn.setAttribute("data-variant", "default");

    // Inline styles for all buttons
    btn.style.padding = "3px 0px";

    // Extra width for the last button (two emojis)
    if (emoji.length > 2) {
      btn.style.minWidth = "3rem";
    }

    const content = document.createElement("span");
    content.className = "prc-Button-ButtonContent-Iohp5";

    const text = document.createElement("span");
    text.className = "prc-Button-Label-FWkx3";
    text.textContent = emoji;

    content.appendChild(text);
    btn.appendChild(content);

    btn.addEventListener("click", () => {
      insertBullet(textarea, emoji);
    });

    return btn;
  }

  function enhanceEditor(container) {
    if (container.querySelector(`.${BUTTON_CLASS}`)) return;

    const textarea = container.querySelector(
      'textarea[placeholder="Leave a comment"]',
    );
    if (!textarea) return;

    const headerToolbar = container.querySelector(
      ".d-flex.flex-justify-between.flex-items-center",
    );
    if (!headerToolbar) return;

    const wrapper = document.createElement("div");
    wrapper.className = `${BUTTON_CLASS} d-flex flex-items-center`;
    wrapper.style.gap = "4px";
    wrapper.style.marginLeft = "auto";

    SECTIONS.forEach((section) => {
      wrapper.appendChild(createButton(section.emoji, section.label, textarea));
    });

    headerToolbar.appendChild(wrapper);
  }

  function scan() {
    document
      .querySelectorAll('[data-marker-id="new-comment"]')
      .forEach(enhanceEditor);
  }

  scan();

  const observer = new MutationObserver(scan);
  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
})();
