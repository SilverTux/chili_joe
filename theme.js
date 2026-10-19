(() => {
  const storageKey = "chili-joes-theme";
  const root = document.documentElement;
  const toggle = document.querySelector(".theme-toggle");
  const themeColor = document.querySelector('meta[name="theme-color"]');
  const systemDark = window.matchMedia("(prefers-color-scheme: dark)");

  function savedTheme() {
    try {
      return localStorage.getItem(storageKey);
    } catch {
      return null;
    }
  }

  function applyTheme(theme) {
    const selectedTheme = theme === "dark" ? "dark" : "light";
    root.dataset.theme = selectedTheme;
    toggle.setAttribute("aria-pressed", String(selectedTheme === "dark"));
    themeColor.setAttribute("content", selectedTheme === "dark" ? "#0a1f5e" : "#ffffff");
  }

  toggle.addEventListener("click", () => {
    const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
    applyTheme(nextTheme);
    try {
      localStorage.setItem(storageKey, nextTheme);
    } catch {
      // The toggle still works for this visit when browser storage is unavailable.
    }
  });

  systemDark.addEventListener("change", (event) => {
    if (!savedTheme()) applyTheme(event.matches ? "dark" : "light");
  });

  applyTheme(root.dataset.theme);
})();
