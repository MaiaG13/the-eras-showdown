/*
 * The Eras Showdown
 * Main Application Entry Point
 */
import { changeTheme, getSavedTheme } from "../themes/themeManager.js";
import { initializeTournament } from "./games/tournament.js?v=guided8";

const completedThemes = [
  "debut", "fearless", "speakNow", "red", "nineteenEightyNine",
  "reputation", "lover", "folklore", "evermore", "midnights",
  "ttpd", "tloas"
];

function initializeApp() {
  initializeTournament();
  const themeSelect = document.getElementById("theme-test-select");
  const welcome = document.getElementById("theme-welcome");
  const savedTheme = getSavedTheme();
  const hasSavedTheme = completedThemes.includes(savedTheme);

  // Preview Lover behind the welcome screen, but do not save a choice
  // before the visitor selects an era.
  if (hasSavedTheme) {
    changeTheme(savedTheme);
  } else {
    changeTheme("lover");
    localStorage.removeItem("selectedEra");
  }

  if (themeSelect) {
    themeSelect.value = hasSavedTheme ? savedTheme : "lover";
    themeSelect.addEventListener("change", () => {
      changeTheme(themeSelect.value);
    });
  }

  if (!hasSavedTheme && welcome) {
    welcome.hidden = false;
    document.body.style.overflow = "hidden";

    const firstChoice = welcome.querySelector(".theme-choice");
    firstChoice?.focus();

    welcome.querySelectorAll(".theme-choice").forEach(button => {
      button.addEventListener("click", () => {
        const themeId = button.dataset.theme;
        if (!completedThemes.includes(themeId)) return;
        if (!changeTheme(themeId)) return;

        if (themeSelect) themeSelect.value = themeId;
        welcome.hidden = true;
        document.body.style.overflow = "";
        themeSelect?.focus();
      });
    });
  }
}

initializeApp();
