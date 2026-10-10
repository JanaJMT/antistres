const fortunes = [
  "Zajtra ťa poteší správa, na ktorú sa už dlho tešíš.",
  "Tvoj úsmev zajtra niekomu rozžiari celý deň.",
  "Čaká ťa malý úspech, ktorý ti pripomenie, aká si šikovná.",
  "Náhodné stretnutie ti prinesie presne tú energiu, ktorú potrebuješ.",
  "Zajtra objavíš novú príležitosť tam, kde by si ju nečakala.",
  "Niekto ti zajtra povie niečo, čo ti zahreje srdce.",
  "Všetko, na čom pracuješ, sa pomaly skladá na svoje miesto.",
  "Dopraješ si chvíľku pre seba a bude to to najlepšie rozhodnutie.",
  "Tvoj dobrý nápad si zajtra všimne ten správny človek.",
  "Zajtrajšok prinesie pokoj, ľahkosť a dôvod na vďačnosť.",
  "Zvládneš niečo, čo sa ti ešte včera zdalo náročné.",
  "Príjemné prekvapenie si už k tebe hľadá cestu.",
  "Tvoja láskavosť sa ti zajtra vráti v tej najkrajšej podobe.",
  "Pred tebou je deň plný maličkostí, ktoré stoja za úsmev.",
  "Urobíš krok vpred a budeš na seba právom hrdá."
];

const ball = document.querySelector("#crystal-ball");
const button = document.querySelector("#reveal-button");
const breathingButton = document.querySelector("#breathing-button");
const breathingButtonLabel = document.querySelector("#breathing-button-label");
const breathingCue = document.querySelector("#breathing-cue");
const reading = document.querySelector(".reading");
const readingLabel = document.querySelector("#reading-label");
const readingText = document.querySelector("#reading-text");
const root = document.documentElement;
const palette = [
  ["#a997f3", "#f3a9d0", "#ffc89d"],
  ["#8edcc8", "#a5b4f4", "#f4c1da"],
  ["#f3a8bd", "#e9a3e2", "#a6b7f5"],
  ["#ffc397", "#f4a8be", "#cab0f5"],
  ["#9fdac9", "#bca6ef", "#f7c9a1"],
  ["#ed9eca", "#b6a6f4", "#9cddcd"]
];

let previousFortune = -1;
let paletteIndex = 0;
let revealTimeout;
let breathingInterval;
let breathingTimeout;
let isInhaling = false;

function getNextFortune() {
  const offset = Math.floor(Math.random() * (fortunes.length - 1)) + 1;
  previousFortune = (previousFortune + offset) % fortunes.length;
  return fortunes[previousFortune];
}

function revealFortune() {
  window.clearTimeout(revealTimeout);
  paletteIndex = (paletteIndex + 1) % palette.length;
  const colors = palette[paletteIndex];

  root.style.setProperty("--orb-color-a", colors[0]);
  root.style.setProperty("--orb-color-b", colors[1]);
  root.style.setProperty("--orb-color-c", colors[2]);
  readingLabel.textContent = "tvoja veštba na zajtra";
  readingText.textContent = getNextFortune();
  reading.classList.remove("fortune-arrived");
  void reading.offsetWidth;
  reading.classList.add("fortune-arrived");
  document.body.classList.add("is-revealing");

  revealTimeout = window.setTimeout(() => {
    document.body.classList.remove("is-revealing");
  }, 850);
}

function stopBreathing(message) {
  window.clearInterval(breathingInterval);
  window.clearTimeout(breathingTimeout);
  breathingInterval = undefined;
  breathingTimeout = undefined;
  document.body.classList.remove("is-breathing");
  breathingButton.setAttribute("aria-pressed", "false");
  breathingButtonLabel.textContent = "Chvíľka pre seba · 1 min";
  breathingCue.textContent = message;
}

function toggleBreathing() {
  if (breathingButton.getAttribute("aria-pressed") === "true") {
    stopBreathing("Cvičenie ukončené. Pokračuj vlastným tempom.");
    return;
  }

  document.body.classList.add("is-breathing");
  breathingButton.setAttribute("aria-pressed", "true");
  breathingButtonLabel.textContent = "Ukončiť cvičenie";
  isInhaling = true;
  breathingCue.textContent = "Nádych — pomaly, 3 sekundy.";

  breathingInterval = window.setInterval(() => {
    isInhaling = !isInhaling;
    breathingCue.textContent = isInhaling
      ? "Nádych — pomaly, 3 sekundy."
      : "Výdych — pomaly, 3 sekundy.";
  }, 3000);

  breathingTimeout = window.setTimeout(() => {
    stopBreathing("Minútka pre seba je hotová. Nech sa ti darí.");
  }, 60000);
}

button.addEventListener("click", revealFortune);
breathingButton.addEventListener("click", toggleBreathing);
