
/*
 * The Eras Showdown
 * Theme Manager
 *
 * Loads album themes, applies their styles,
 * and remembers the visitor's selection.
 */

import * as debut from "./debut/debut.js";
import * as fearless from "./fearless/fearless.js";
import * as speakNow from "./speakNow/speakNow.js";
import * as red from "./red/red.js";
import * as nineteenEightyNine from "./nineteenEightyNine/nineteenEightyNine.js";
import * as reputation from "./reputation/reputation.js";
import * as lover from "./lover/lover.js";
import * as folklore from "./folklore/folklore.js";
import * as evermore from "./evermore/evermore.js";
import * as midnights from "./midnights/midnights.js";
import * as ttpd from "./ttpd/ttpd.js";
import * as tloas from "./tloas/tloas.js";

// Every theme has a unique identifier.
const themes = {
  debut,
  fearless,
  speakNow,
  red,
  nineteenEightyNine,
  reputation,
  lover,
  folklore,
  evermore,
  midnights,
  ttpd,
  tloas
};

const STORAGE_KEY = "selectedEra";

let activeTheme = null;
let activeThemeId = null;

// Return the identifiers of all available themes.
export function getAvailableThemes() {
  return Object.keys(themes);
}

// Retrieve the visitor's saved theme.
export function getSavedTheme() {
  const saved = localStorage.getItem(STORAGE_KEY);

  // Ignore saved values that aren't valid themes.
  return saved && themes[saved] ? saved : null;
}

// Apply a new album theme.
export function changeTheme(themeId) {
  const nextTheme = themes[themeId];

  if (!nextTheme) {
    console.warn(`Unknown theme: ${themeId}`);
    return false;
  }

  const container = document.getElementById(
    "theme-decorations"
  );

  if (!container) {
    console.error("Theme decorations container not found.");
    return false;
  }

  // Don't activate the same theme twice.
  if (activeThemeId === themeId) {
    return true;
  }

  // Remove the previous theme's effects.
  if (activeTheme?.deactivate) {
    activeTheme.deactivate(container);
  }

  // Remove previously applied theme colors.
  if (activeTheme?.colors) {
    for (const key of Object.keys(activeTheme.colors)) {
      document.documentElement.style.removeProperty(
        `--${key}`
      );
    }
  }

  // Apply the new theme's colors.
  if (nextTheme.colors) {
    for (const [key, value] of Object.entries(
      nextTheme.colors
    )) {
      document.documentElement.style.setProperty(
        `--${key}`,
        value
      );
    }
  }

  // Activate album-specific effects.
  if (nextTheme.activate) {
    nextTheme.activate(container);
  }

  activeTheme = nextTheme;
  activeThemeId = themeId;

  // Remember the visitor's selection.
  localStorage.setItem(STORAGE_KEY, themeId);

  return true;
}

// Return the currently active theme.
export function getActiveTheme() {
  return activeThemeId;
}

// Load a saved theme, if one exists.
export function initializeThemes() {
  const savedTheme = getSavedTheme();

  if (savedTheme) {
    changeTheme(savedTheme);
    return true;
  }

  // No saved theme: the welcome screen will
  // ask the visitor to select one.
  return false;
}
