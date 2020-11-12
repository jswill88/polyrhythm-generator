import * as Tone from 'tone';

export function makeSynth(panner, gain) {
  return new Tone.Synth({
    oscillator: {
      type: 'sine',
    },
    envelope: {
      attack: .2,
      release: .5,
    },
    filter: {
      Q: 2,
      type: 'lowpass',
    },
    volume: 10,
    portamento: 5,

  }).chain(gain, panner).toDestination();
}

export function makeLoop (rhythm, synth, note, oppRhythm, highlight) {
  return new Tone.Loop(time => {

    synth.triggerAttackRelease(note, '32n', time);
    Tone.Draw.schedule(() => {

      highlight(prev => (prev + 1) % oppRhythm)
    }, time)

  }, `0:${rhythm}`).start(.1);
}