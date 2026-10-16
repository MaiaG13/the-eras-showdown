/* The Eras Showdown — Midnights theme */
export const name = "Midnights";
export const colors = {
  background: "#2A2F4F",
  secondary: "#544B65",
  accent: "#A2626B",
  secondaryAccent: "#8B9AC7",
  text: "#EEE6E3"
};

export function activate(container) {
  container.classList.add("midnights-theme");
  const symbols = ["✦","☾","✧","⋆"];
  for (let i = 0; i < 22; i++) {
    const element = document.createElement("span");
    element.className = "midnights-decoration";
    element.textContent = symbols[i % symbols.length];
    element.style.left = `${(i * 37 + 9) % 100}%`;
    element.style.top = `${(i * 29 + 11) % 100}%`;
    element.style.animationDelay = `${(i * 0.43) % 8}s`;
    element.style.animationDuration = `${5 + (i % 5) * 1.1}s`;
    container.appendChild(element);
  }
}
export function deactivate(container) {
  container.classList.remove("midnights-theme");
  container.querySelectorAll(".midnights-decoration").forEach(element => element.remove());
}
