/* The Eras Showdown — The Life of a Showgirl theme */
export const name = "The Life of a Showgirl";
export const colors = {
  background: "#BFE8DC",
  secondary: "#6FC4B0",
  accent: "#E66B36",
  secondaryAccent: "#2F7E77",
  text: "#0E4F4A"
};

export function activate(container) {
  container.classList.add("tloas-theme");
  const symbols = ["✦","✧","💎","✴"];
  for (let i = 0; i < 22; i++) {
    const element = document.createElement("span");
    element.className = "tloas-decoration";
    element.textContent = symbols[i % symbols.length];
    element.style.left = `${(i * 37 + 9) % 100}%`;
    element.style.top = `${(i * 29 + 11) % 100}%`;
    element.style.animationDelay = `${(i * 0.43) % 8}s`;
    element.style.animationDuration = `${5 + (i % 5) * 1.1}s`;
    container.appendChild(element);
  }
}
export function deactivate(container) {
  container.classList.remove("tloas-theme");
  container.querySelectorAll(".tloas-decoration").forEach(element => element.remove());
}
