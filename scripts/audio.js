import { shuffleArray } from "./utils.js";

function play(audioCtx, oscillatorType, freq, dur) {
  const osc = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();

  osc.frequency.value = freq;
  osc.type = oscillatorType;

  gainNode.gain.setValueAtTime(0.5, audioCtx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + dur);

  osc.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  osc.start(audioCtx.currentTime);
  osc.stop(audioCtx.currentTime + dur);
}

function initSoftMusic() {
  let audioCtx;
  let timeouts = [];

  const melody = [
    622, 466, 622, 784, 932, 784, 622, 466, 622, 784, 932, 784, 622, 466,
  ];
  const baseRhythm = 1.2;

  function playMelody() {
    audioCtx = new AudioContext();
    let totalTime = 0;
    melody.forEach((note) => {
      const rhythmVariation = baseRhythm * (1.15 + Math.random() * 0.1);
      timeouts.push(
        setTimeout(
          () => play(audioCtx, "sine", note, rhythmVariation),
          totalTime * 1000
        )
      );
      totalTime += rhythmVariation;
    });
    timeouts.push(setTimeout(playMelody, totalTime * 1000));
  }

  return {
    start: playMelody,
    stop() {
      timeouts.forEach(clearTimeout);
      timeouts = [];
      audioCtx?.close();
      audioCtx = null;
    },
  };
}

function initDynamicMusic() {
  let audioCtx;
  let timeouts = [];

  let theme = [
    440, 494, 523, 440, 392, 440, 349, 440, 349, 440, 392, 440, 349, 392, 523,
    0,
  ];
  const misc1 = shuffleArray([...theme]).filter((x) => x > 0);
  const misc2 = shuffleArray([...theme]).filter((x) => x > 0);
  const misc3 = shuffleArray([...theme]).filter((x) => x > 0);

  const melody = [
    ...theme,
    ...theme,
    ...misc1,
    ...theme,
    ...misc2,
    ...misc1,
    ...theme,
    ...misc3,
    ...misc2,
  ];
  const rythm = 0.25;

  function playMelody() {
    audioCtx = new AudioContext();
    let totalTime = 0;
    melody.forEach((note, index) => {
      const rythmToUse = index === 13 ? rythm : rythm;
      timeouts.push(
        setTimeout(
          () => play(audioCtx, "sine", note, rythmToUse),
          totalTime * 1000
        )
      );
      totalTime += rythmToUse;
    });
    timeouts.push(setTimeout(playMelody, totalTime * 1000));
  }

  return {
    start: playMelody,
    stop() {
      timeouts.forEach(clearTimeout);
      timeouts = [];
      audioCtx?.close();
      audioCtx = null;
    },
  };
}

function initRetroMusic() {
  let audioCtx;
  let timeouts = [];

  const mainTheme = [
    523, 659, 784, 659, 523, 784, 659, 784, 880, 784, 659, 523, 784, 659, 523,
    659, 784, 659, 523, 784, 659, 784, 880, 784, 659, 523, 784, 659, 523, 659,
    784, 523,
  ];
  const mainRhythm = [
    0.15, 0.15, 0.3, 0.15, 0.15, 0.3, 0.15, 0.15, 0.3, 0.15, 0.15, 0.3, 0.15,
    0.15, 0.3, 0.15, 0.15, 0.3, 0.15, 0.15, 0.3, 0.15, 0.15, 0.3, 0.15, 0.15,
    0.3, 0.15, 0.15, 0.3, 0.15, 0.3,
  ];

  const variation = [
    523, 587, 659, 523, 587, 659, 523, 659, 523, 659, 698, 784, 880, 784, 698,
    659, 587, 523, 587, 523, 493, 440, 493, 523, 587, 659, 698, 659, 587, 523,
    440, 392,
  ];
  const variationRhythm = [
    0.15, 0.15, 0.15, 0.15, 0.15, 0.15, 0.15, 0.15, 0.15, 0.15, 0.3, 0.3, 0.3,
    0.3, 0.15, 0.15, 0.15, 0.15, 0.15, 0.15, 0.15, 0.15, 0.15, 0.15, 0.15, 0.15,
    0.3, 0.3, 0.15, 0.15, 0.3, 0.3,
  ];

  function playMelody() {
    audioCtx = new AudioContext();
    let totalTime = 0;
    mainTheme.forEach((note, index) => {
      timeouts.push(
        setTimeout(
          () => play(audioCtx, "square", note, mainRhythm[index]),
          totalTime * 1000
        )
      );
      totalTime += mainRhythm[index];
    });
    variation.forEach((note, index) => {
      timeouts.push(
        setTimeout(
          () => play(audioCtx, "square", note, variationRhythm[index]),
          totalTime * 1000
        )
      );
      totalTime += variationRhythm[index];
    });
    timeouts.push(setTimeout(playMelody, totalTime * 1000));
  }

  return {
    start: playMelody,
    stop() {
      timeouts.forEach(clearTimeout);
      timeouts = [];
      audioCtx?.close();
      audioCtx = null;
    },
  };
}

export const softMusic = initSoftMusic();
export const dynamicMusic = initDynamicMusic();
export const retroMusic = initRetroMusic();
