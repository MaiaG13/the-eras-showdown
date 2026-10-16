/* The Eras Showdown — The Tortured Poets Department theme */
export const name = "The Tortured Poets Department";
export const colors = {
  background: "#2D2A26",
  secondary: "#4A4540",
  accent: "#8C7C70",
  secondaryAccent: "#C9BDAF",
  text: "#EAE4DB"
};

export function activate(container) {
  container.classList.add("ttpd-theme");
  const symbols = ["✒","❦","✧","⌁"];
  for (let i = 0; i < 22; i++) {
    const element = document.createElement("span");
    element.className = "ttpd-decoration";
    element.textContent = symbols[i % symbols.length];
    element.style.left = `${(i * 37 + 9) % 100}%`;
    element.style.top = `${(i * 29 + 11) % 100}%`;
    element.style.animationDelay = `${(i * 0.43) % 8}s`;
    element.style.animationDuration = `${5 + (i % 5) * 1.1}s`;
    container.appendChild(element);
  }
}
export function deactivate(container) {
  container.classList.remove("ttpd-theme");
  container.querySelectorAll(".ttpd-decoration").forEach(element => element.remove());
}
