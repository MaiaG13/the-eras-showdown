/* The Eras Showdown — evermore theme */
export const name = "evermore";
export const colors = {
  background: "#F8F1E8",
  secondary: "#E6D0B8",
  accent: "#A76543",
  secondaryAccent: "#C89569",
  text: "#49352D"
};

export function activate(container) {
  container.classList.add("evermore-theme");
  const symbols = ["🍂","🍁","✦","❧"];
  for (let i = 0; i < 22; i++) {
    const element = document.createElement("span");
    element.className = "evermore-decoration";
    element.textContent = symbols[i % symbols.length];
    element.style.left = `${(i * 37 + 9) % 100}%`;
    element.style.top = `${(i * 29 + 11) % 100}%`;
    element.style.animationDelay = `${(i * 0.43) % 8}s`;
    element.style.animationDuration = `${5 + (i % 5) * 1.1}s`;
    container.appendChild(element);
  }
}

export function deactivate(container) {
  container.classList.remove("evermore-theme");
  container.querySelectorAll(".evermore-decoration").forEach(element => element.remove());
}
