
/*
 * The Eras Showdown
 * Lover Theme
 */

export const name = "Lover";

export const colors = {
  background: "#FFF0F6",
  secondary: "#F5C7DB",
  accent: "#E7548F",
  secondaryAccent: "#A7D8F0",
  text: "#75435F"
};

export function activate(container) {
  container.classList.add("lover-theme");
}

export function deactivate(container) {
  container.classList.remove("lover-theme");
}
