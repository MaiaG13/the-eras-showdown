
/*
 * The Eras Showdown
 * Main Application Entry Point
 *
 * Initializes the website and connects
 * its modules and components.
 */

import {
  changeTheme,
  getSavedTheme
} from "../themes/themeManager.js";

function initializeApp() {
  console.log("The Eras Showdown is starting!");

  // Load a saved theme if one exists.
  // Otherwise, temporarily use Lover.
  const selectedTheme = getSavedTheme() ?? "lover";

  changeTheme(selectedTheme);

  // Coming later:
  // 1. First-visit welcome screen
  // 2. Settings menu
  // 3. Game modules
}

initializeApp();
