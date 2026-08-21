/**
 * Sound effects for Zappy using Web Audio API (no external files needed).
 * Generates fun, game-show style sounds programmatically.
 */

let audioCtx = null;

function getAudioContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
}

function playTone(frequency, duration, type = "sine", volume = 0.3, ramp = true) {
  const ctx = getAudioContext();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(frequency, ctx.currentTime);
  gain.gain.setValueAtTime(volume, ctx.currentTime);
  if (ramp) {
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
  }
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + duration);
}

/** Played when a player joins the lobby */
export function playJoinSound() {
  playTone(523, 0.1, "sine", 0.25);
  setTimeout(() => playTone(659, 0.1, "sine", 0.25), 100);
  setTimeout(() => playTone(784, 0.15, "sine", 0.3), 200);
}

/** Played when a new question starts */
export function playQuestionStartSound() {
  playTone(440, 0.12, "square", 0.15);
  setTimeout(() => playTone(554, 0.12, "square", 0.15), 120);
  setTimeout(() => playTone(659, 0.12, "square", 0.15), 240);
  setTimeout(() => playTone(880, 0.25, "square", 0.2), 360);
}

/** Played when selecting/clicking an answer */
export function playClickSound() {
  playTone(800, 0.06, "sine", 0.2);
}

/** Played when submitting an answer */
export function playSubmitSound() {
  playTone(600, 0.08, "triangle", 0.25);
  setTimeout(() => playTone(900, 0.12, "triangle", 0.3), 80);
}

/** Played when the answer is correct */
export function playCorrectSound() {
  playTone(523, 0.12, "sine", 0.3);
  setTimeout(() => playTone(659, 0.12, "sine", 0.3), 120);
  setTimeout(() => playTone(784, 0.12, "sine", 0.3), 240);
  setTimeout(() => playTone(1047, 0.3, "sine", 0.35), 360);
}

/** Played when the answer is wrong */
export function playWrongSound() {
  playTone(310, 0.2, "sawtooth", 0.15);
  setTimeout(() => playTone(280, 0.3, "sawtooth", 0.12), 200);
}

/** Played when a question's timer is running low (≤5s) */
export function playTickSound() {
  playTone(1000, 0.04, "square", 0.12);
}

/** Played when time runs out on a question */
export function playTimeUpSound() {
  playTone(600, 0.15, "sawtooth", 0.2);
  setTimeout(() => playTone(400, 0.15, "sawtooth", 0.2), 150);
  setTimeout(() => playTone(300, 0.3, "sawtooth", 0.15), 300);
}

/** Played when game is over — celebratory fanfare */
export function playGameOverSound() {
  const notes = [523, 659, 784, 1047, 784, 1047, 1319];
  notes.forEach((freq, i) => {
    setTimeout(() => playTone(freq, 0.2, "sine", 0.3), i * 150);
  });
}

/** Played when the host starts the game / room is created */
export function playRoomCreatedSound() {
  playTone(392, 0.15, "triangle", 0.25);
  setTimeout(() => playTone(523, 0.15, "triangle", 0.25), 150);
  setTimeout(() => playTone(659, 0.2, "triangle", 0.3), 300);
  setTimeout(() => playTone(784, 0.3, "triangle", 0.35), 450);
}

/** Played on leaderboard update */
export function playLeaderboardSound() {
  playTone(698, 0.1, "sine", 0.2);
  setTimeout(() => playTone(880, 0.15, "sine", 0.25), 100);
}

/** Countdown beep (3, 2, 1...) */
export function playCountdownBeep() {
  playTone(880, 0.1, "square", 0.2);
}
