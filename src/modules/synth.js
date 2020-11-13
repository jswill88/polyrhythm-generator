import * as Tone from 'tone';
/** 
 * @name makeSynth - Makes the Tone.js Synths to be used.
 * @argument {Number} panner - which direction to pan the synth 
 * @argument {Number} gain - How much gain to add to the synth
 * @returns {Tone.Synth} - Synth that will be used in main body
 */
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

/**
 * @name makeLoop - Makes the loops that will be played by the synths
 * @param {Number} rhythm 
 * @param {Tone.Synth} synth 
 * @param {String} note 
 * @param {Number} oppRhythm 
 * @param {Number} highlight 
 */
export function makeLoop (rhythm, synth, note, oppRhythm, highlight) {
  return new Tone.Loop(time => {

    synth.triggerAttackRelease(note, '32n', time);
    Tone.Draw.schedule(() => {

      highlight(prev => (prev + 1) % oppRhythm)
    }, time)

  }, `0:${rhythm}`).start(.1);
}