/* The Eras Showdown — Red theme */
export const name = "Red";
export const colors = {
  background: "#FAF0E6",
  secondary: "#E4C4B7",
  accent: "#922F42",
  secondaryAccent: "#B64D5A",
  text: "#45252B"
};

export function activate(container) {
  container.classList.add("red-theme");
  const symbols = ["🍁","🍂","✦","♡"];
  for (let i = 0; i < 22; i++) {
    const element = document.createElement("span");
    element.className = "red-decoration";
    element.textContent = symbols[i % symbols.length];
    element.style.left = `${(i * 37 + 9) % 100}%`;
    element.style.top = `${(i * 29 + 11) % 100}%`;
    element.style.animationDelay = `${(i * 0.43) % 8}s`;
    element.style.animationDuration = `${5 + (i % 5) * 1.1}s`;
    container.appendChild(element);
  }
}

export function deactivate(container) {
  container.classList.remove("red-theme");
  container.querySelectorAll(".red-decoration").forEach(element => element.remove());
}
