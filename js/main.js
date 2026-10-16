
/*
 * The Eras Showdown
 * Main Application Entry Point
 */

import {
  changeTheme,
  getSavedTheme
} from "../themes/themeManager.js";

function initializeApp() {
  console.log("The Eras Showdown is starting!");

  const themeSelect = document.getElementById(
    "theme-test-select"
  );

  // Only use completed themes during testing.
  const completedThemes = ["lover", "debut", "fearless"];

  const savedTheme = getSavedTheme();

  const startingTheme =
    completedThemes.includes(savedTheme)
      ? savedTheme
      : "lover";

  // Apply the starting theme.
  changeTheme(startingTheme);

  // Match the dropdown to the active theme.
  if (themeSelect) {
    themeSelect.value = startingTheme;

    themeSelect.addEventListener("change", () => {
      changeTheme(themeSelect.value);
    });
  }
}

initializeApp();
