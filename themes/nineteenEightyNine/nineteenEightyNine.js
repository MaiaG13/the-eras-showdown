/* The Eras Showdown — 1989 theme */
export const name = "1989";
export const colors = {
  background: "#F0F8FC",
  secondary: "#C6E5F4",
  accent: "#6CA8CE",
  secondaryAccent: "#E5D5BD",
  text: "#29485D"
};

export function activate(container) {
  container.classList.add("nineteenEightyNine-theme");
  const symbols = ["☁","✧","☼","✦"];
  for (let i = 0; i < 22; i++) {
    const element = document.createElement("span");
    element.className = "nineteenEightyNine-decoration";
    element.textContent = symbols[i % symbols.length];
    element.style.left = `${(i * 37 + 9) % 100}%`;
    element.style.top = `${(i * 29 + 11) % 100}%`;
    element.style.animationDelay = `${(i * 0.43) % 8}s`;
    element.style.animationDuration = `${5 + (i % 5) * 1.1}s`;
    container.appendChild(element);
  }
}

export function deactivate(container) {
  container.classList.remove("nineteenEightyNine-theme");
  container.querySelectorAll(".nineteenEightyNine-decoration").forEach(element => element.remove());
}
