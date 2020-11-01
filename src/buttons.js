import React, { useEffect, useState } from 'react';
import * as Tone from 'tone';

import './App.scss';

export default function Buttons() {

  const [leftRhythm, setLeftRhythm] = useState(4);
  const [rightRhythm, setRightRhythm] = useState(3);
  const [tempo, setTempo] = useState(120);
  const [leftHighlight, setLeftHighlight] = useState(-1);
  const [rightHighlight, setRightHighlight] = useState(-1);
  const [leftNote, setLeftNote] = useState('F3')
  const [rightNote, setRightNote] = useState('C4')

  const styles = {

    rightSquare: {
      height: '50%',
      maxHeight: 50,
      maxWidth: '50%',
      // margin: 'auto',
      // border: "1px solid black"
    },

    leftSquare: {
      height: '50%',
      maxWidth: '50%',
      maxHeight: 50,
      // margin: 'auto',
      // border: "1px solid black"
    },
  }


  const setTimers = async () => {
    setLeftHighlight(-1);
    setRightHighlight(-1);
    await Tone.start();
    Tone.Transport.bpm.value = rightRhythm * tempo;
    Tone.Transport.start();
  }


  useEffect(() => {

    const leftPanner = new Tone.Panner(-1);
    const rightPanner = new Tone.Panner(-1);
    var synth = new Tone.PolySynth(Tone.Synth).connect(leftPanner).toDestination();
    var synth2 = new Tone.PolySynth(Tone.Synth).connect(rightPanner).toDestination();


    let lLoop = new Tone.Loop(time => {
      console.log(time)
      synth.triggerAttackRelease(leftNote, '64n', time);
      Tone.Draw.schedule(() => {
        setLeftHighlight(prev => (prev + 1) % rightRhythm)
      }, time)

    }, `0:${leftRhythm}`).start(.05)

    let rLoop = new Tone.Loop(time => {
      console.log(time)
      synth2.triggerAttackRelease(rightNote, '64n', time);
      Tone.Draw.schedule(() => {

        setRightHighlight(prev => (prev + 1) % leftRhythm)
      }, time)

    }, `0:${rightRhythm}`).start(.05)

    Tone.Transport.bpm.value = rightRhythm * tempo;

    return () => {
      lLoop.cancel()
      rLoop.cancel();
    }

  }, [rightRhythm, leftRhythm, tempo, leftNote, rightNote])

  const stop = () => {
    unhighlight();
    Tone.Transport.stop();
  }
  const unhighlight = () => {
    setLeftHighlight(-2)
    setRightHighlight(-2)
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
        <div>
          <div
            className={
              square === 'leftSquare' ?
                i === rightHighlight ? `${square} highlight` : `${square}`
                : i === leftHighlight ? `${square} highlight` : `${square}`
            }
            key={i}
            style={styles[square]/*[i]*/}>
          </div>
        </div>
      )
    }
    return squares;
  }

  function Notes ({noteArray, rl}) {
    return (
      <>
        <label for="notes">Note: </label>
        <select
          id="notes"
          // defaultValue={rl === 'right' ? leftNote : rightNote}
          // value={rl === 'right' ? leftNote : rightNote}
          onChange={
            e => rl === 'right'
              ? setLeftNote(e.target.value)
              : setRightNote(e.target.value)
          }>
          {noteArray.map((note, i) =>
            <option
              selected={
                rl === 'right'
                  ? note === leftNote ? true : false
                  : note === rightNote ? true : false
              }
              value={note}
              key={i}>
              {note.slice(0, note.length - 1)}
            </option>
          )}
        </select>
      </>
    )
  }

  return (
    <div>
      <section>

        <label for="tempo">Tempo: {tempo} bpm</label>
        <input type="range" name="tempo" min="40" max="300" step="1" defaultValue={tempo} onChange={handleTempo} />
        <button id='button' onClick={setTimers}>Start</button>
        <button id='button' onClick={stop}>Stop</button>
      </section>

      <div className="container">

        <div className="blinkBox">

          <div className="sideHeader">
            <label for="leftSub">Subdivision:</label>
            <input id="leftSub" type="number" min="1" defaultValue={leftRhythm} onChange={handleLeft} />
            {Notes({
              noteArray: ['A4', 'B3', 'C4', 'D4', 'E4', 'F4', 'G4'],
              rl: 'left'
            })}
            {/* <Notes
            noteArray={['A4', 'B3', 'C4', 'D4', 'E4', 'F4', 'G4']}
            rl={'left'}
            /> */}
          </div>
          <div className="sideBody">

            {squares(leftRhythm, 'leftSquare')}
          </div>
        </div>

        <div className="blinkBox">

          <div className="sideHeader">
            <label for="rightSub">Subdivision:</label>
            <input id="rightSub" type="number" min="1" defaultValue={rightRhythm} onChange={handleRight} />
            {Notes({
              noteArray: ['A3', 'B2', 'C3', 'D3', 'E3', 'F3', 'G3'],
              rl:'right'
              })}
            {/* <Notes
            noteArray={['A3', 'B2', 'C3', 'D3', 'E3', 'F3', 'G3']}
            rl={'right'}
            /> */}
          </div>

          <div className="sideBody">
            {squares(rightRhythm, 'rightSquare')}
          </div>

        </div>

      </div>

    </div>
  );
}
