
/*
 * The Eras Showdown
 * Lover Theme
 *
 * Pastel pinks, dreamy blues, floating hearts,
 * and sparkles.
 */

export const name = "Lover";

export const colors = {
  background: "#FFF0F6",
  secondary: "#F5C7DB",
  accent: "#E7548F",
  secondaryAccent: "#A7D8F0",
  text: "#75435F"
};

// Add Lover-specific decorations.
export function activate(container) {
  container.classList.add("lover-theme");

  // Create floating hearts.
  const hearts = ["💕", "💗", "💖", "🩷"];

  for (let i = 0; i < 12; i++) {
    const heart = document.createElement("span");

    heart.className = "lover-heart";
    heart.textContent = hearts[i % hearts.length];

    // Distribute hearts across the screen.
    heart.style.left = `${(i * 37) % 100}%`;
    heart.style.animationDelay = `${(i * 0.7) % 10}s`;

    container.appendChild(heart);
  }

  // Create sparkles.
  for (let i = 0; i < 20; i++) {
    const sparkle = document.createElement("span");

    sparkle.className = "lover-sparkle";
    sparkle.textContent = "✦";

    sparkle.style.left = `${(i * 43) % 100}%`;
    sparkle.style.top = `${(i * 29) % 100}%`;
    sparkle.style.animationDelay = `${(i * 0.4) % 8}s`;

    container.appendChild(sparkle);
  }
}

// Remove Lover decorations when changing themes.
export function deactivate(container) {
  container.classList.remove("lover-theme");

  container
    .querySelectorAll(".lover-heart, .lover-sparkle")
    .forEach(element => element.remove());
}
