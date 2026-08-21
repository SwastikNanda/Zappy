/**
 * Zappy dynamic background-music engine (Web Audio API, no external files).
 *
 * Implements the psychological quiz-loop score:
 *   - "lobby"    : The Anticipation  -> upbeat, plucky, head-bobbing funk (~115 BPM)
 *   - "question" : The Focus         -> minimal ticking-clock tension + sub-bass pulse (~125 BPM)
 *   - panic mode : The Last 5 Seconds-> tempo +18% and pitch +1 semitone, accelerating heartbeat
 *
 * Design notes:
 *   - A single AudioContext with a look-ahead scheduler = perfectly seamless loops,
 *     regardless of question timer length.
 *   - A peaking EQ filter carves the 250Hz-4kHz mid-range so voice chat and SFX cut through.
 *   - Music volume is kept low so the existing reveal SFX ("the payoff") stays dominant.
 */

let ctx = null;
let musicGain = null; // overall music level (fades in/out)
let eq = null; // peaking filter that carves out the mid/speech range
let master = null;

let muted = false;
let started = false; // scheduler running
let currentMode = null; // 'lobby' | 'question' | null
let panic = false;

let schedulerTimer = null;
let nextNoteTime = 0;
let step = 0; // 0..15 within the current 16-step loop

const LOOKAHEAD_MS = 25;
const SCHEDULE_AHEAD = 0.12; // seconds
const MUSIC_LEVEL = 0.16; // target music gain (kept modest on purpose)

const SEMITONE = Math.pow(2, 1 / 12);

// ---- Note frequencies (Hz) -------------------------------------------------
const N = {
  C2: 65.41, D2: 73.42, E2: 82.41, F2: 87.31, G2: 98.0, A2: 110.0, B2: 123.47,
  C3: 130.81, E3: 164.81, G3: 196.0, A3: 220.0,
  C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23, G4: 392.0, A4: 440.0, B4: 493.88,
  C5: 523.25, D5: 587.33, E5: 659.25, G5: 783.99,
};

// ---- Loop patterns (16 sixteenth-note steps) -------------------------------
// null = rest. Numbers = frequency in Hz.

// "The Anticipation": funky plucky bass + bouncy synth melody
const LOBBY_BASS = [
  N.A2, null, N.A2, N.C3, N.E3, null, N.A2, null,
  N.G2, null, N.G2, N.B2, N.D2 * 2, null, N.G2, null,
];
const LOBBY_MELODY = [
  N.E5, null, N.C5, null, N.A4, null, N.C5, N.D5,
  N.E5, null, N.G5, null, N.E5, null, N.D5, N.C5,
];

// "The Focus": staccato ticking clock (steady 8th notes) + sub-bass on each beat
const QUESTION_TICK = N.C5; // high, short blip
const QUESTION_SUB = N.A2;

// ---- Audio graph -----------------------------------------------------------
function ensureContext() {
  if (!ctx) {
    ctx = new (window.AudioContext || window.webkitAudioContext)();

    master = ctx.createGain();
    master.gain.value = 1;

    // Carve out human-speech / SFX frequencies (250Hz - 4kHz)
    eq = ctx.createBiquadFilter();
    eq.type = "peaking";
    eq.frequency.value = 1400;
    eq.Q.value = 0.9;
    eq.gain.value = -9;

    musicGain = ctx.createGain();
    musicGain.gain.value = 0;

    musicGain.connect(eq);
    eq.connect(master);
    master.connect(ctx.destination);
  }
  if (ctx.state === "suspended") ctx.resume();
  return ctx;
}

// ---- Voices ----------------------------------------------------------------
function pluck(freq, time, dur, type, vol) {
  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, time);
  g.gain.setValueAtTime(0.0001, time);
  g.gain.exponentialRampToValueAtTime(vol, time + 0.008);
  g.gain.exponentialRampToValueAtTime(0.0001, time + dur);
  osc.connect(g);
  g.connect(musicGain);
  osc.start(time);
  osc.stop(time + dur + 0.02);
}

function sub(freq, time, dur, vol) {
  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(freq, time);
  g.gain.setValueAtTime(0.0001, time);
  g.gain.exponentialRampToValueAtTime(vol, time + 0.02);
  g.gain.exponentialRampToValueAtTime(0.0001, time + dur);
  osc.connect(g);
  g.connect(musicGain);
  osc.start(time);
  osc.stop(time + dur + 0.02);
}

function noiseHat(time, dur, vol) {
  const bufferSize = Math.floor(ctx.sampleRate * dur);
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
  const src = ctx.createBufferSource();
  src.buffer = buffer;
  const hp = ctx.createBiquadFilter();
  hp.type = "highpass";
  hp.frequency.value = 7000;
  const g = ctx.createGain();
  g.gain.setValueAtTime(vol, time);
  g.gain.exponentialRampToValueAtTime(0.0001, time + dur);
  src.connect(hp);
  hp.connect(g);
  g.connect(musicGain);
  src.start(time);
  src.stop(time + dur);
}

// Low "heartbeat" thump used during panic mode
function heartbeat(time, vol) {
  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(90, time);
  osc.frequency.exponentialRampToValueAtTime(45, time + 0.12);
  g.gain.setValueAtTime(0.0001, time);
  g.gain.exponentialRampToValueAtTime(vol, time + 0.01);
  g.gain.exponentialRampToValueAtTime(0.0001, time + 0.14);
  osc.connect(g);
  g.connect(musicGain);
  osc.start(time);
  osc.stop(time + 0.16);
}

// ---- Scheduling ------------------------------------------------------------
function transpose(freq) {
  return panic ? freq * SEMITONE : freq;
}

function currentBpm() {
  const base = currentMode === "question" ? 125 : 115;
  return panic ? base * 1.18 : base;
}

function secondsPerStep() {
  // 16th notes
  return 60 / currentBpm() / 4;
}

function scheduleStep(s, time) {
  if (currentMode === "lobby") {
    const b = LOBBY_BASS[s];
    if (b) pluck(transpose(b), time, 0.16, "triangle", 0.5);

    const m = LOBBY_MELODY[s];
    if (m) pluck(transpose(m), time, 0.14, "square", 0.16);

    // light off-beat hats
    if (s % 2 === 1) noiseHat(time, 0.04, 0.14);
  } else if (currentMode === "question") {
    // ticking clock on every 8th note
    if (s % 2 === 0) {
      pluck(transpose(QUESTION_TICK), time, 0.05, "square", 0.14);
    }
    // deep pulsing sub-bass on each beat
    if (s % 4 === 0) {
      sub(transpose(QUESTION_SUB), time, 0.28, 0.5);
    }
    // accelerating heartbeat during the panic window
    if (panic && (s % 4 === 0 || s % 4 === 2)) {
      heartbeat(time, 0.4);
    }
  }
}

function scheduler() {
  while (nextNoteTime < ctx.currentTime + SCHEDULE_AHEAD) {
    scheduleStep(step, nextNoteTime);
    nextNoteTime += secondsPerStep();
    step = (step + 1) % 16;
  }
}

function startScheduler() {
  if (started) return;
  started = true;
  step = 0;
  nextNoteTime = ctx.currentTime + 0.05;
  schedulerTimer = setInterval(scheduler, LOOKAHEAD_MS);
}

function fadeMusicTo(target, seconds) {
  const now = ctx.currentTime;
  musicGain.gain.cancelScheduledValues(now);
  musicGain.gain.setValueAtTime(Math.max(0.0001, musicGain.gain.value), now);
  musicGain.gain.linearRampToValueAtTime(target, now + seconds);
}

// ---- Public API ------------------------------------------------------------
export function startLobbyMusic() {
  ensureContext();
  panic = false;
  currentMode = "lobby";
  startScheduler();
  if (!muted) fadeMusicTo(MUSIC_LEVEL, 0.6);
}

export function startQuestionMusic() {
  ensureContext();
  panic = false;
  currentMode = "question";
  startScheduler();
  if (!muted) fadeMusicTo(MUSIC_LEVEL, 0.4);
}

export function setPanic(on) {
  if (!started || currentMode !== "question") return;
  panic = !!on;
}

export function stopMusic() {
  if (!ctx) return;
  fadeMusicTo(0.0001, 0.4);
  setTimeout(() => {
    if (schedulerTimer) clearInterval(schedulerTimer);
    schedulerTimer = null;
    started = false;
    currentMode = null;
    panic = false;
  }, 450);
}

export function setMusicMuted(value) {
  muted = !!value;
  try {
    localStorage.setItem("zappy_music_muted", muted ? "1" : "0");
  } catch (e) {
    /* ignore */
  }
  if (!ctx) return;
  if (muted) fadeMusicTo(0.0001, 0.2);
  else if (started) fadeMusicTo(MUSIC_LEVEL, 0.3);
}

export function toggleMusicMuted() {
  setMusicMuted(!muted);
  return muted;
}

export function isMusicMuted() {
  if (typeof muted === "boolean" && ctx) return muted;
  try {
    return localStorage.getItem("zappy_music_muted") === "1";
  } catch (e) {
    return false;
  }
}

// Initialise muted state from storage at module load
try {
  muted = localStorage.getItem("zappy_music_muted") === "1";
} catch (e) {
  muted = false;
}
