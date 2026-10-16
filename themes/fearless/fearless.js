/*
 * The Eras Showdown
 * Fearless Theme
 *
 * Champagne gold, sunshine, and shimmering golden stars.
 */
export const name = "Fearless";
export const colors = {
  background: "#FFF9E9",
  secondary: "#F4E4B7",
  accent: "#C99B42",
  secondaryAccent: "#E8C875",
  text: "#57401F"
};

export function activate(container) {
  container.classList.add("fearless-theme");
  const symbols = ["✦", "✧", "✶", "✨"];
  for (let i = 0; i < 22; i++) {
    const sparkle = document.createElement("span");
    sparkle.className = "fearless-sparkle";
    sparkle.textContent = symbols[i % symbols.length];
    sparkle.style.left = `${(i * 41 + 7) % 100}%`;
    sparkle.style.top = `${(i * 29 + 13) % 100}%`;
    sparkle.style.animationDelay = `${(i * 0.37) % 6}s`;
    sparkle.style.animationDuration = `${3.5 + (i % 5) * 0.6}s`;
    container.appendChild(sparkle);
  }
}

export function deactivate(container) {
  container.classList.remove("fearless-theme");
  container.querySelectorAll(".fearless-sparkle").forEach(element => element.remove());
}
