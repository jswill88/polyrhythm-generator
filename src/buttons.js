import React, { useEffect, useState } from 'react';
import * as Tone from 'tone';

import './App.scss';

export default function Buttons() {

  const [leftSquare, setLeftSquare] = useState('block');
  const [rightSquare, setRightSquare] = useState('none');
  const [leftRhythm, setLeftRhythm] = useState(4);
  const [rightRhythm, setRightRhythm] = useState(3);
  const [tempo, setTempo] = useState(120);
  const [highlightNum, setHighlightNum] = useState(-1);

  const styles = {

    rightSquare: {
      // 1: {
      height: 75,
      width: 75,
      // backgroundColor: '#f5f5f5',
      margin: 10,
      display: leftSquare,
      border: "1px solid black"
      // }
    },

    leftSquare: {
      height: 75,
      width: 75,
      backgroundColor: 'green',
      margin: 10,
      display: rightSquare,
    },
  }


  const setTimers = async () => {
    await Tone.start();
    Tone.Transport.bpm.value = rightRhythm * tempo;
    Tone.Transport.start();
  }


  useEffect(() => {

    var synth = new Tone.PolySynth(Tone.Synth).toDestination();
    var synth2 = new Tone.PolySynth(Tone.Synth).toDestination();

    let lLoop = new Tone.Loop(time => {

      synth.triggerAttackRelease("C4", '64n', time);
      Tone.Draw.schedule(() => {
        // setLeftSquare(prev => prev === 'block' ? 'none' : 'block')
        setHighlightNum(prev => (prev + 1) % rightRhythm )
      }, time)
        .schedule(() => {
          // setLeftSquare('none')
        }, time + .15);

    }, `0:${leftRhythm}`).start(.05)

    let rLoop = new Tone.Loop(time => {

      synth2.triggerAttackRelease("F3", '64n', time);
      Tone.Draw.schedule(() => {
        setRightSquare(prev => prev === 'block' ? 'none' : 'block')
        
      }, time)
        .schedule(() => {
          setRightSquare('none')
        }, time + .15);

    }, `0:${rightRhythm}`).start(.05)

    Tone.Transport.bpm.value = rightRhythm * tempo;

    return () => {
      lLoop.cancel()
      rLoop.cancel();
    }

  }, [rightRhythm, leftRhythm, tempo])

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

  const handleTempo = event => {
    Tone.Transport.bpm.value = event.target.value * rightRhythm;
    setTempo(event.target.value)
  }

  const squares = (side, square) => {
    const squares = [];
    for (let i = 0; i < side; i++) {
      squares.push(
        <div
          className={i === highlightNum ? `${square} highlight` : `${square}`}
          key={i}
          style={styles[square]/*[i]*/}>
        </div>)
    }
    return squares;
  }

  return (
    <div id='wrapper'>
      <section>

        <button id='button' onClick={setTimers}>Start</button>
        <button id='button' onClick={stop}>Stop</button>

        <input type="range" min="40" max="300" step="1" defaultValue={tempo} onChange={handleTempo} />
      </section>

      <input type="number" min="1" defaultValue={leftRhythm} onChange={handleLeft} />

      <div className="blinkBox">
        {squares(leftRhythm, 'leftSquare')}
      </div>


      <input type="number" min="1" defaultValue={rightRhythm} onChange={handleRight} />

      <div className="blinkBox">
        {squares(rightRhythm, 'rightSquare')}
      </div>

    </div>
  );
}
