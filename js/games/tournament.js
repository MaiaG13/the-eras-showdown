/* The Eras Showdown — interactive single-elimination bracket */
const ERAS = ["Debut","Fearless","Speak Now","Red","1989","reputation","Lover","folklore","evermore","Midnights","The Tortured Poets Department","The Life of a Showgirl"];
let root, rounds;

function node(tag, cls = "", text = "") {
  const el = document.createElement(tag);
  if (cls) el.className = cls;
  if (text) el.textContent = text;
  return el;
}
function button(text, handler, cls = "") {
  const el = node("button", cls, text);
  el.type = "button";
  el.addEventListener("click", handler);
  return el;
}
function shuffle(values) {
  const items = [...values];
  for (let i = items.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [items[i], items[j]] = [items[j], items[i]];
  }
  return items;
}
function setup(names) {
  const entrants = names.map(x => x.trim());
  if (entrants.length < 2 || entrants.some(x => !x) ||
      new Set(entrants.map(x => x.toLowerCase())).size !== entrants.length) {
    root.querySelector("#tournament-message").textContent = "Enter unique names for every contestant.";
    return;
  }
  const count = 2 ** Math.ceil(Math.log2(entrants.length));
  const slots = Array(count).fill(null);
  const randomized = shuffle(entrants);
  // One bye maximum per first-round pairing.
  const byeCount = count - entrants.length;
  let cursor = 0;
  for (let i = 0; i < count / 2; i++) {
    slots[i * 2] = randomized[cursor++];
    if (i >= byeCount) slots[i * 2 + 1] = randomized[cursor++];
  }
  rounds = [];
  let size = count;
  while (size >= 2) {
    rounds.push(Array.from({length: size / 2}, () => ({players: [null, null], winner: null})));
    size /= 2;
  }
  for (let i = 0; i < slots.length / 2; i++) {
    rounds[0][i].players = slots.slice(i * 2, i * 2 + 2);
    if (rounds[0][i].players.includes(null)) rounds[0][i].winner = rounds[0][i].players.find(Boolean);
  }
  propagate();
  root.querySelector("#tournament-setup").hidden = true;
  render();
}
function propagate() {
  for (let r = 1; r < rounds.length; r++) {
    for (let m = 0; m < rounds[r].length; m++) {
      const a = rounds[r - 1][m * 2].winner;
      const b = rounds[r - 1][m * 2 + 1].winner;
      const match = rounds[r][m];
      match.players = [a, b];
      if (match.winner && !match.players.includes(match.winner)) match.winner = null;
    }
  }
}
function selectWinner(r, m, player) {
  const match = rounds[r][m];
  if (!match.players.includes(player) || !player || match.players.some(x => !x)) return;
  match.winner = player;
  // Clear downstream picks before rebuilding; no stale winners after changing a choice.
  for (let later = r + 1; later < rounds.length; later++) {
    for (const game of rounds[later]) game.winner = null;
  }
  propagate();
  render();
}
function render() {
  const area = root.querySelector("#tournament-bracket");
  area.replaceChildren();
  if (!rounds) return;
  const toolbar = node("div", "bracket-toolbar");
  toolbar.appendChild(node("p", "", "Click a contestant to advance them. Scroll sideways to view later rounds."));
  toolbar.appendChild(button("New tournament", () => {
    rounds = null;
    root.querySelector("#tournament-setup").hidden = false;
    area.replaceChildren();
  }, "bracket-reset"));
  area.appendChild(toolbar);
  const board = node("div", "bracket-board");
  rounds.forEach((matches, r) => {
    const column = node("section", "bracket-round");
    const heading = matches.length === 1 ? "Final" : matches.length === 2 ? "Semifinals" : matches.length === 4 ? "Quarterfinals" : "Round of " + matches.length * 2;
    column.appendChild(node("h3", "", heading));
    const games = node("div", "bracket-round-games");
    matches.forEach((match, m) => {
      const game = node("div", "bracket-match");
      match.players.forEach((player, index) => {
        const label = player || (r === 0 ? "Bye" : "TBD");
        const pick = button(label, () => selectWinner(r, m, player), "bracket-player");
        if (match.winner === player && player) pick.classList.add("is-winner");
        if (!player || match.players.some(x => !x) || match.winner) pick.disabled = !player || match.players.some(x => !x);
        pick.setAttribute("aria-label", player ? "Advance " + player : label);
        game.appendChild(pick);
      });
      games.appendChild(game);
    });
    column.appendChild(games);
    board.appendChild(column);
  });
  const final = rounds[rounds.length - 1][0];
  const champion = node("section", "bracket-champion");
  champion.appendChild(node("h3", "", "Champion"));
  champion.appendChild(node("div", "bracket-champion-name", final.winner || "To be crowned"));
  board.appendChild(champion);
  area.appendChild(board);
}
function renderInputs(count) {
  const fields = root.querySelector("#tournament-fields");
  fields.replaceChildren();
  for (let i = 0; i < count; i++) {
    const label = node("label", "tournament-field");
    label.appendChild(node("span", "", "Contestant " + (i + 1)));
    const input = node("input");
    input.type = "text";
    input.required = true;
    input.maxLength = 100;
    input.placeholder = "Name";
    label.appendChild(input);
    fields.appendChild(label);
  }
}
export function initializeTournament() {
  root = document.getElementById("tournament-app");
  if (!root) return;
  const count = root.querySelector("#tournament-size");
  renderInputs(Number(count.value));
  count.addEventListener("change", () => renderInputs(Number(count.value)));
  root.querySelector("#tournament-eras").addEventListener("click", () => setup(ERAS));
  root.querySelector("#tournament-setup").addEventListener("submit", event => {
    event.preventDefault();
    setup([...root.querySelectorAll("#tournament-fields input")].map(input => input.value));
  });
}
