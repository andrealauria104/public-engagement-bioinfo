// Short synthesized feedback tones (Web Audio API, no audio assets to bundle
// or license). Callers are responsible for checking mute state before
// invoking these -- kept side-effect-free otherwise.

let ctx = null;

function getContext() {
  if (!ctx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    ctx = new AudioContextClass();
  }
  if (ctx.state === "suspended") ctx.resume();
  return ctx;
}

function tone({ freq, start, duration, type = "sine", peakGain = 0.18 }) {
  const audio = getContext();
  const osc = audio.createOscillator();
  const gain = audio.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, audio.currentTime + start);
  gain.gain.setValueAtTime(0, audio.currentTime + start);
  gain.gain.linearRampToValueAtTime(peakGain, audio.currentTime + start + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.001, audio.currentTime + start + duration);
  osc.connect(gain).connect(audio.destination);
  osc.start(audio.currentTime + start);
  osc.stop(audio.currentTime + start + duration + 0.02);
}

// Bright ascending two-note chime.
export function playCorrectSound() {
  tone({ freq: 587.33, start: 0, duration: 0.14, type: "triangle" }); // D5
  tone({ freq: 880.0, start: 0.09, duration: 0.22, type: "triangle" }); // A5
}

// Soft short descending buzz -- low-key, not harsh in a public setting.
export function playIncorrectSound() {
  tone({ freq: 220.0, start: 0, duration: 0.12, type: "square", peakGain: 0.1 });
  tone({ freq: 174.61, start: 0.07, duration: 0.18, type: "square", peakGain: 0.1 });
}
