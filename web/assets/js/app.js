(() => {
  "use strict";

  const zh = document.documentElement.lang === "zh-CN";
  const config = window.WAREHOUSE_CONFIG;
  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => [...document.querySelectorAll(selector)];
  const text = (en, cn) => zh ? cn : en;

  function initMenu(boxSelector, buttonSelector) {
    const box = $(boxSelector);
    const button = $(buttonSelector);
    if (!box || !button) return;
    const close = () => {
      box.classList.remove("is-open");
      button.setAttribute("aria-expanded", "false");
    };
    button.addEventListener("click", () => {
      const open = box.classList.toggle("is-open");
      button.setAttribute("aria-expanded", String(open));
    });
    document.addEventListener("click", (event) => {
      if (!box.contains(event.target)) close();
    });
    box.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        close();
        button.focus();
      }
    });
  }

  function initTheme() {
    const box = $("[data-theme-box]");
    if (!box) return;
    let choice = "dark";
    try { choice = localStorage.getItem("warehouse-theme") || "dark"; } catch {}
    const media = window.matchMedia("(prefers-color-scheme: light)");
    const apply = (value) => {
      choice = ["dark", "light", "system"].includes(value) ? value : "dark";
      document.documentElement.dataset.theme = choice === "system" ? (media.matches ? "light" : "dark") : choice;
      $$("[data-theme-option]").forEach((item) => {
        const active = item.dataset.themeOption === choice;
        item.classList.toggle("is-active", active);
        item.setAttribute("aria-pressed", String(active));
      });
      try { localStorage.setItem("warehouse-theme", choice); } catch {}
    };
    $$("[data-theme-option]").forEach((item) => item.addEventListener("click", () => {
      apply(item.dataset.themeOption);
      box.classList.remove("is-open");
      $("[data-theme-button]").setAttribute("aria-expanded", "false");
    }));
    media.addEventListener("change", () => { if (choice === "system") apply(choice); });
    apply(choice);
    initMenu("[data-theme-box]", "[data-theme-button]");
  }

  function initProfile() {
    const host = $("[data-public-profile]");
    if (!host) return;
    host.innerHTML = `
      <div class="profile-head">
        <div class="avatar-ring"><img src="./assets/img/user.png" alt="THDeb"></div>
        <div class="profile-copy">
          <h1 class="username">THDeb (TouhouDebian)</h1>
          <p class="lead">${text("Welcome to THDeb's project repository website.", "欢迎来到 THDeb 的项目仓库网站。")}</p>
          <p class="sublead">${text("Open-source projects and personal creations.", "开源项目与个人作品。")}</p>
        </div>
      </div>
      <div class="contact-list">
        <div class="contact-row">
          <img class="contact-icon" src="./assets/img/github.png" alt="" width="128" height="128">
          <div class="contact-main"><span class="contact-platform">GitHub</span>
            <a class="link-line" href="${config.githubUrl}" target="_blank" rel="noopener noreferrer">github.com/TouhouDebian</a>
          </div>
        </div>
      </div>`;
  }

  function initProjects() {
    $$(".project-card__toggle").forEach((button) => button.addEventListener("click", () => {
      const card = button.closest(".project-card");
      const open = card.classList.toggle("is-open");
      button.setAttribute("aria-expanded", String(open));
      $("#" + button.getAttribute("aria-controls")).setAttribute("aria-hidden", String(!open));
      button.querySelector(".project-card__toggle-text").textContent = open ? "⌃" : "⌄";
    }));
  }

  function updateAboutUptime() {
    const start = new Date(2026, 5, 16);
    const now = new Date();
    const days = Math.max(0, Math.floor((Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()) - Date.UTC(start.getFullYear(), start.getMonth(), start.getDate())) / 86400000));
    $$("[data-site-uptime-duration]").forEach((element) => {
      element.textContent = text(`${days} days`, `${days} 天`);
    });
  }

  $$("[data-language-item]").forEach((item) => item.addEventListener("click", () => {
    window.location.href = item.dataset.target;
  }));
  initMenu("[data-language-box]", "[data-language-button]");
  initTheme();
  initProfile();
  initProjects();
  updateAboutUptime();
})();
