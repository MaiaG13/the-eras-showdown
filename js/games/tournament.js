/*
 * The Eras Showdown — basic single-elimination tournament.
 * No external dependencies or song database required.
 */
const ERAS = [
  "Debut", "Fearless", "Speak Now", "Red", "1989", "reputation",
  "Lover", "folklore", "evermore", "Midnights",
  "The Tortured Poets Department", "The Life of a Showgirl"
];

let state = null;
let root = null;

function shuffle(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function makeButton(text, onClick, className = "") {
  const button = element("button", className, text);
  button.type = "button";
  button.addEventListener("click", onClick);
  return button;
}

function startTournament(names) {
  const entries = names.map(name => name.trim()).filter(Boolean);
  if (entries.length < 2 || new Set(entries.map(n => n.toLowerCase())).size !== entries.length) {
    showMessage("Enter at least two different contestant names.");
    return;
  }
  const shuffled = shuffle(entries);
  const size = 2 ** Math.ceil(Math.log2(shuffled.length));
  // Spread automatic byes across the first round.
  const slots = Array(size).fill(null);
  if (shuffled.length === size) {
    shuffled.forEach((name, index) => { slots[index] = name; });
  } else {
    const byes = size - shuffled.length;
    let cursor = 0;
    for (let i = 0; i < size / 2; i++) {
      slots[2 * i] = shuffled[cursor++];
      if (i >= byes) slots[2 * i + 1] = shuffled[cursor++];
    }
  }
  state = { rounds: [slots], roundIndex: 0, winners: [], champion: null };
  renderBracket();
}

function showMessage(message) {
  const target = root?.querySelector("#tournament-message");
  if (target) target.textContent = message;
}

function chooseWinner(name) {
  if (!state || state.champion) return;
  const round = state.rounds[state.roundIndex];
  const matchIndex = state.winners.length;
  if (round[2 * matchIndex] !== name && round[2 * matchIndex + 1] !== name) return;
  state.winners.push(name);
  if (state.winners.length === round.length / 2) {
    if (state.winners.length === 1) {
      state.champion = name;
    } else {
      state.rounds.push([...state.winners]);
      state.roundIndex += 1;
      state.winners = [];
    }
  }
  renderBracket();
}

function renderBracket() {
  if (!root || !state) return;
  const bracket = root.querySelector("#tournament-bracket");
  bracket.replaceChildren();
  const title = element("h3", "", state.champion ? "Tournament Complete!" : "Choose your winner");
  bracket.appendChild(title);
  if (state.champion) {
    bracket.appendChild(element("p", "tournament-champion", "Champion: " + state.champion));
    bracket.appendChild(makeButton("Start a new tournament", () => {
      state = null;
      root.querySelector("#tournament-setup").hidden = false;
      bracket.replaceChildren();
    }, "tournament-action"));
    return;
  }

  const round = state.rounds[state.roundIndex];
  const roundName = round.length === 2 ? "Final" : round.length === 4 ? "Semifinals" : round.length === 8 ? "Quarterfinals" : "Round of " + round.length;
  bracket.appendChild(element("p", "", roundName + " — Match " + (state.winners.length + 1) + " of " + (round.length / 2)));
  const a = round[state.winners.length * 2];
  const b = round[state.winners.length * 2 + 1];
  const matchup = element("div", "tournament-matchup");
  if (!a || !b) {
    const advancing = a || b;
    matchup.appendChild(element("p", "", advancing + " advances with a bye."));
    matchup.appendChild(makeButton("Continue", () => chooseWinner(advancing), "tournament-action"));
  } else {
    matchup.appendChild(makeButton(a, () => chooseWinner(a), "tournament-contestant"));
    matchup.appendChild(element("span", "", "vs"));
    matchup.appendChild(makeButton(b, () => chooseWinner(b), "tournament-contestant"));
  }
  bracket.appendChild(matchup);

  const history = element("div", "tournament-history");
  history.appendChild(element("h4", "", "Results so far"));
  state.rounds.forEach((r, index) => {
    if (index < state.roundIndex) {
      history.appendChild(element("p", "", "Round " + (index + 1) + ": " + state.rounds[index + 1].join(" · ")));
    } else if (state.winners.length) {
      history.appendChild(element("p", "", "Current round: " + state.winners.join(" · ")));
    }
  });
  bracket.appendChild(history);
  bracket.appendChild(makeButton("Reset tournament", () => {
    state = null;
    root.querySelector("#tournament-setup").hidden = false;
    bracket.replaceChildren();
  }, "tournament-reset"));
}

function renderInputs(count) {
  const fields = root.querySelector("#tournament-fields");
  fields.replaceChildren();
  for (let i = 0; i < count; i++) {
    const label = element("label", "tournament-field");
    label.appendChild(element("span", "", "Contestant " + (i + 1)));
    const input = element("input");
    input.type = "text";
    input.maxLength = 100;
    input.required = true;
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
  root.querySelector("#tournament-eras").addEventListener("click", () => {
    root.querySelector("#tournament-setup").hidden = true;
    startTournament(ERAS);
  });
  root.querySelector("#tournament-setup").addEventListener("submit", event => {
    event.preventDefault();
    const names = [...root.querySelectorAll("#tournament-fields input")].map(input => input.value);
    if (names.some(name => !name.trim())) {
      showMessage("Please fill in every contestant.");
      return;
    }
    const unique = new Set(names.map(name => name.trim().toLowerCase()));
    if (unique.size !== names.length) {
      showMessage("Each contestant needs a different name.");
      return;
    }
    root.querySelector("#tournament-setup").hidden = true;
    startTournament(names);
  });
}
