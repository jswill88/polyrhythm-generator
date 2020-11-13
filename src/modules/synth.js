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
      type:'sine'
    },
    envelope: {
      attack: .02,
      attackCurve: 'exponential',
      decay: .5,
      decayCurve: 'exponential',
      sustain: .1,
    },
    filter: {
      Q: 6,
    },
    volume: -12,
  }).chain(gain, panner).toDestination();
}

/**
 * @name makeLoop - Makes the loops that will be played by the synths
 * @param {Number} rhythm - How often the note will play
 * @param {Tone.Synth} synth - The synth that will be used for the loop
 * @param {String} note - The name of the note
 * @param {Number} oppRhythm - The rhythm of the oppposite synth
 * @param {Number} highlight - Tracks which square will be highlighted
 * @return {Tone.Loop} Loop that us played when "play" is pressed
 */
export function makeLoop (rhythm, synth, note, oppRhythm, highlight) {
  return new Tone.Loop(time => {

    synth.triggerAttackRelease(note, '32n', time);
    Tone.Draw.schedule(() => {

      highlight(prev => (prev + 1) % oppRhythm)
    }, time)

  }, `0:${rhythm}`).start(.1);
}
