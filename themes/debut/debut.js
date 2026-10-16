
/*
 * The Eras Showdown
 * Debut Theme
 *
 * Soft meadow greens, delicate botanicals,
 * and an early-country aesthetic.
 */

export const name = "Taylor Swift (Debut)";

export const colors = {
  background: "#F2F5E8",
  secondary: "#D8E5BF",
  accent: "#85A65B",
  secondaryAccent: "#B8C98A",
  text: "#344A32"
};

// Add Debut-specific decorations.
export function activate(container) {
  container.classList.add("debut-theme");

  const decorations = ["🌼", "🌿", "🍃", "✿"];

  for (let i = 0; i < 16; i++) {
    const decoration = document.createElement("span");

    decoration.className = "debut-decoration";
    decoration.textContent =
      decorations[i % decorations.length];

    decoration.style.left = `${(i * 31) % 100}%`;
    decoration.style.top = `${(i * 23) % 100}%`;
    decoration.style.animationDelay = `${i * 0.4}s`;

    container.appendChild(decoration);
  }
}

// Remove Debut decorations when switching themes.
export function deactivate(container) {
  container.classList.remove("debut-theme");

  container
    .querySelectorAll(".debut-decoration")
    .forEach(element => element.remove());
}
