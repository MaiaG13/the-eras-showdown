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
  // Distribute byes across bracket quadrants, rather than clustering
  // them on one side. For 12 eras, each of the four quadrants gets one bye.
  const byeCount = count - entrants.length;
  const matchCount = count / 2;
  // Assign byes from the OUTSIDE edges inward on each side.
  // For 12 entrants in a 16-slot bracket, matches 0, 3, 4, 7
  // receive byes: top/bottom of the left and right wings.
  const byePriority = [];
  const half = Math.floor(matchCount / 2);
  for (let depth = 0; depth < half; depth++) {
    for (const index of [depth, half - 1 - depth, half + depth, matchCount - 1 - depth]) {
      if (!byePriority.includes(index)) byePriority.push(index);
    }
  }
  if (matchCount % 2) byePriority.push(half);
  const byeMatches = byePriority.slice(0, byeCount);
  const byeSet = new Set(byeMatches);
  let cursor = 0;
  for (let i = 0; i < matchCount; i++) {
    slots[i * 2] = randomized[cursor++];
    if (!byeSet.has(i)) slots[i * 2 + 1] = randomized[cursor++];
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
  const board = node("div", "bracket-board bracket-board-double");
  const last = rounds.length - 1;

  function makeColumn(r, side) {
    const matches = rounds[r];
    const column = node("section", "bracket-round bracket-" + side);
    const roundSize = matches.length * 2;
    const heading = roundSize === 4 ? "Semifinals" : roundSize === 8 ? "Quarterfinals" : "Round of " + roundSize;
    column.appendChild(node("h3", "", heading));
    const games = node("div", "bracket-round-games");
    const half = matches.length / 2;
    const offset = side === "left" ? 0 : half;
    matches.slice(offset, offset + half).forEach((match, localIndex) => {
      const m = offset + localIndex;
      const game = node("div", "bracket-match");
      match.players.forEach(player => {
        const label = player || (r === 0 ? "Bye" : "TBD");
        const pick = button(label, () => selectWinner(r, m, player), "bracket-player");
        if (match.winner === player && player) pick.classList.add("is-winner");
        pick.disabled = !player || match.players.some(x => !x);
        pick.setAttribute("aria-label", player ? "Advance " + player : label);
        game.appendChild(pick);
      });
      games.appendChild(game);
    });
    column.appendChild(games);
    return column;
  }

  // Both sides advance inward, meeting in the center for the final.
  const left = node("div", "bracket-wing bracket-wing-left");
  const right = node("div", "bracket-wing bracket-wing-right");
  for (let r = 0; r < last; r++) left.appendChild(makeColumn(r, "left"));
  for (let r = last - 1; r >= 0; r--) right.appendChild(makeColumn(r, "right"));

  const center = node("section", "bracket-center");
  center.appendChild(node("h3", "", "Championship"));
  const final = rounds[last][0];
  const finalMatch = node("div", "bracket-match bracket-final");
  final.players.forEach(player => {
    const pick = button(player || "TBD", () => selectWinner(last, 0, player), "bracket-player");
    if (final.winner === player && player) pick.classList.add("is-winner");
    pick.disabled = !player || final.players.some(x => !x);
    finalMatch.appendChild(pick);
  });
  center.appendChild(finalMatch);
  center.appendChild(node("h3", "champion-title", "Champion"));
  center.appendChild(node("div", "bracket-champion-name", final.winner || "To be crowned"));

  board.appendChild(left);
  board.appendChild(center);
  board.appendChild(right);
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
