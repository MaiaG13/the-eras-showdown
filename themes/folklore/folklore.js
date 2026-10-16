/* The Eras Showdown — folklore theme */
export const name = "folklore";
export const colors = {
  background: "#F0F0ED",
  secondary: "#D2D3D0",
  accent: "#838783",
  secondaryAccent: "#ABB4A8",
  text: "#363B39"
};

export function activate(container) {
  container.classList.add("folklore-theme");
  const symbols = ["✧","☁","♧","✦"];
  for (let i = 0; i < 22; i++) {
    const element = document.createElement("span");
    element.className = "folklore-decoration";
    element.textContent = symbols[i % symbols.length];
    element.style.left = `${(i * 37 + 9) % 100}%`;
    element.style.top = `${(i * 29 + 11) % 100}%`;
    element.style.animationDelay = `${(i * 0.43) % 8}s`;
    element.style.animationDuration = `${5 + (i % 5) * 1.1}s`;
    container.appendChild(element);
  }
}

export function deactivate(container) {
  container.classList.remove("folklore-theme");
  container.querySelectorAll(".folklore-decoration").forEach(element => element.remove());
}
