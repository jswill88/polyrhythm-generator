import React, { useEffect, useState } from 'react';
import * as Tone from 'tone';

import './App.css';

export default function Buttons() {

  const [leftSquaare, setLeftSquare] = useState('none');
  const [rightSquare, setRightSquare] = useState('none');
  const [leftRhythm, setLeftRhythm] = useState(4);
  const [rightRhythm, setRightRhythm] = useState(3);

  const styles = {

    square: {
      height: 75,
      width: 75,
      backgroundColor: 'magenta',
      marginLeft: 25,
      display: leftSquaare,
    },

    square2: {
      height: 75,
      width: 75,
      backgroundColor: 'green',
      marginRight: 25,
      display: rightSquare,
    },

  }

  const setTimers = async () => {
    await Tone.start();
    Tone.Transport.bpm.value = rightRhythm * 120 / 2;
    Tone.Transport.start();
  }


  useEffect(() => {

    var synth = new Tone.PolySynth(Tone.Synth).toDestination();
    var synth2 = new Tone.PolySynth(Tone.Synth).toDestination();

    let lLoop = new Tone.Loop(time => {

      synth.triggerAttackRelease("F3", '64n', time);
      Tone.Draw.schedule(() => {
        setLeftSquare(prev => prev === 'block' ? 'none' : 'block')
      }, time)
        .schedule(() => {
          setLeftSquare('none')
        }, time + .15);

    }, `0:${leftRhythm}`).start(.05)

    let rLoop = new Tone.Loop(time => {

      synth2.triggerAttackRelease("C4", '64n', time);
      Tone.Draw.schedule(() => {
        setRightSquare(prev => prev === 'block' ? 'none' : 'block')
      }, time)
        .schedule(() => {
          setRightSquare('none')
        }, time + .15);

    }, `0:${rightRhythm}`).start(.05)

    Tone.Transport.bpm.value = rightRhythm * 120 / 2;

    return () => {
      lLoop.cancel()
      rLoop.cancel();
    }

  }, [rightRhythm, leftRhythm])

  const stop = () => {
    Tone.Transport.stop();
  }

  const handleLeft = event => {
    if (event.target.value) {
      setLeftRhythm(event.target.value)
    }
  };

  const handleRight = event => {
    if (event.target.value) {
      setRightRhythm(event.target.value)
    }
  };

  return (
    <div id='wrapper'>
      <section>

        <button id='button' onClick={setTimers}>Start</button>
        <button id='button' onClick={stop}>Stop</button>
      </section>

      <input type="number" defaultValue={leftRhythm} onChange={handleLeft} />
      <input type="number" defaultValue={rightRhythm} onChange={handleRight} />

      <div style={styles.square2}></div>
      <div style={styles.square}></div>

    </div>
  );
}
