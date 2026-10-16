/* The Eras Showdown — reputation theme */
export const name = "reputation";
export const colors = {
  background: "#090A0C",
  secondary: "#25262B",
  accent: "#E1E4E9",
  secondaryAccent: "#8D929D",
  text: "#FFFFFF"
};

export function activate(container) {
  container.classList.add("reputation-theme");
  const symbols = ["♠","✦","⛓","◆"];
  for (let i = 0; i < 22; i++) {
    const element = document.createElement("span");
    element.className = "reputation-decoration";
    element.textContent = symbols[i % symbols.length];
    element.style.left = `${(i * 37 + 9) % 100}%`;
    element.style.top = `${(i * 29 + 11) % 100}%`;
    element.style.animationDelay = `${(i * 0.43) % 8}s`;
    element.style.animationDuration = `${5 + (i % 5) * 1.1}s`;
    container.appendChild(element);
  }
}

export function deactivate(container) {
  container.classList.remove("reputation-theme");
  container.querySelectorAll(".reputation-decoration").forEach(element => element.remove());
}
