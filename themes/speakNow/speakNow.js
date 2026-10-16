/*
 * The Eras Showdown
 * Speak Now Theme
 *
 * Enchanted violets, lavender mist, and fairytale stars.
 */
export const name = "Speak Now";

export const colors = {
  background: "#F8F2FC",
  secondary: "#E3D1F0",
  accent: "#8554A5",
  secondaryAccent: "#B994D2",
  text: "#38234D"
};

export function activate(container) {
  container.classList.add("speak-now-theme");

  const symbols = ["✦", "✧", "⋆", "✩", "✨"];
  for (let i = 0; i < 24; i++) {
    const star = document.createElement("span");
    star.className = "speak-now-star";
    star.textContent = symbols[i % symbols.length];
    star.style.left = `${(i * 37 + 11) % 100}%`;
    star.style.top = `${(i * 23 + 17) % 100}%`;
    star.style.animationDelay = `${(i * 0.43) % 7}s`;
    star.style.animationDuration = `${5 + (i % 4)}s`;
    container.appendChild(star);
  }
}

export function deactivate(container) {
  container.classList.remove("speak-now-theme");
  container.querySelectorAll(".speak-now-star").forEach(element => element.remove());
}
