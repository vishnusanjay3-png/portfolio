/* The clapboard's clap, made with Web Audio: a bright noise snap plus a short wooden knock. No sound file.
   Browsers only allow sound after the visitor has clicked, tapped or pressed a key, so `unlock()` runs
   on the first such gesture; until then `clap()` stays silent. */

let ctx: AudioContext | null = null;
let noise: AudioBuffer | null = null;

function context() {
  if (!ctx) {
    const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
    noise = ctx.createBuffer(1, Math.ceil(ctx.sampleRate * 0.25), ctx.sampleRate);
    const d = noise.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
  }
  return ctx;
}

/** Call from inside a click / tap / key handler. */
export function unlock() {
  const c = context();
  if (c && c.state !== "running") c.resume().catch(() => {});
}

/** True once a gesture has unlocked sound. */
export const canPlay = () => ctx?.state === "running";

/** Play the clap. `at` delays it (seconds) so it can land on the arm's impact. */
export function clap(at = 0, volume = 0.55) {
  const c = ctx;
  if (!c || c.state !== "running" || !noise) return;
  const t = c.currentTime + at;
  const out = c.createGain();
  out.gain.value = volume;
  out.connect(c.destination);

  // the snap: bright, very short noise burst
  const src = c.createBufferSource();
  src.buffer = noise;
  const band = c.createBiquadFilter();
  band.type = "bandpass"; band.frequency.value = 2400; band.Q.value = 0.8;
  const high = c.createBiquadFilter();
  high.type = "highpass"; high.frequency.value = 700;
  const env = c.createGain();
  env.gain.setValueAtTime(0, t);
  env.gain.linearRampToValueAtTime(1, t + 0.002);
  env.gain.exponentialRampToValueAtTime(0.18, t + 0.025);
  env.gain.exponentialRampToValueAtTime(0.001, t + 0.12);
  src.connect(band).connect(high).connect(env).connect(out);
  src.start(t, Math.random() * 0.08);
  src.stop(t + 0.14);

  // the knock: the two boards meeting, a quick falling tone
  const osc = c.createOscillator();
  osc.type = "triangle";
  osc.frequency.setValueAtTime(260, t);
  osc.frequency.exponentialRampToValueAtTime(110, t + 0.06);
  const knock = c.createGain();
  knock.gain.setValueAtTime(0, t);
  knock.gain.linearRampToValueAtTime(0.7, t + 0.003);
  knock.gain.exponentialRampToValueAtTime(0.001, t + 0.09);
  osc.connect(knock).connect(out);
  osc.start(t);
  osc.stop(t + 0.1);
}
