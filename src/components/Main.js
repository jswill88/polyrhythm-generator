import React, { useEffect, useState } from 'react';
import * as Tone from 'tone';
import { Slider } from '@material-ui/core';
import { StylesProvider } from "@material-ui/core/styles";
import PlayCircleOutlineTwoToneIcon from '@material-ui/icons/PlayCircleOutlineTwoTone';
import StopIcon from '@material-ui/icons/Stop';

import '../styles/App.scss';
import '../styles/slider.scss'
import Squares from './Squares'

export default function Main() {

  const [leftRhythm, setLeftRhythm] = useState(3);
  const [rightRhythm, setRightRhythm] = useState(4);
  const [tempo, setTempo] = useState(100);
  const [leftHighlight, setLeftHighlight] = useState(-1);
  const [rightHighlight, setRightHighlight] = useState(-1);
  const [leftNote, setLeftNote] = useState('C4')
  const [rightNote, setRightNote] = useState('F3')


  const setTimers = async () => {
    setLeftHighlight(-1);
    setRightHighlight(-1);
    await Tone.start();
    Tone.Transport.bpm.value = rightRhythm * tempo;
    Tone.Transport.start('+0.1');
  }


  useEffect(() => {

    const leftPanner = new Tone.Panner(.85).toDestination();
    const rightPanner = new Tone.Panner(-.85).toDestination();
    const synth = new Tone.PolySynth(Tone.FMSynth).connect(leftPanner)
    const synth2 = new Tone.PolySynth(Tone.FMSynth).connect(rightPanner)
    synth.volume.value = -5;
    synth2.volume.value = -5;


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

  const handleTempo = (e, value) => {
    console.log(value)
    Tone.Transport.bpm.value = value * rightRhythm;
    setTempo(value)
  }

  function Notes({ noteArray, rl }) {
    return (
      <>
        <label htmlFor="notes">Note: </label>
        <select
          id="notes"
          defaultValue={rl === 'right' ? leftNote : rightNote}
          onChange={
            e => rl === 'right'
              ? setLeftNote(e.target.value)
              : setRightNote(e.target.value)
          }>
          {noteArray.map((note, i) =>
            <option
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
    <main>
      <section className="globalControls">
          <StylesProvider injectFirst>
        <div>
          <label htmlFor="tempo">Tempo: {tempo} bpm</label>
            <Slider
              name="tempo"
              min={40}
              max={300}
              step={1}
              value={tempo}
              onChange={handleTempo}
            />
        </div>
        <div>
          {leftHighlight > -1
            ? <button id='button' className="stop" onClick={stop}><StopIcon /></button>
            : <button id='button' onClick={setTimers}><PlayCircleOutlineTwoToneIcon/></button>
          }

        </div>
          </StylesProvider>
      </section>

      <div className="container">

        <div className="blinkBox">

          <div className="sideHeader">
            <label htmlFor="leftSub">Subdivision:</label>
            <input id="leftSub" type="number" min="1" defaultValue={leftRhythm} onChange={handleLeft} />
            {Notes({
              noteArray: ['Bb2', 'B2', 'C3', 'Db3', 'D3', 'Eb3', 'E3', 'F3', 'Gb3', 'G3', 'Ab3', 'A3'],
              rl: 'left'
            })}
          </div>

          <div className="sideBody">
            <Squares
              rhythm={leftRhythm}
              side='left'
              rightHighlight={rightHighlight}
              leftHighlight={leftHighlight}
            />
          </div>
        </div>

        <div className="blinkBox">

          <div className="sideHeader">
            <label htmlFor="rightSub">Subdivision:</label>
            <input id="rightSub" type="number" min="1" defaultValue={rightRhythm} onChange={handleRight} />
            {Notes({
              noteArray: ['Bb3', 'B3', 'C4', 'Db4', 'D4', 'Eb4', 'E4', 'F4', 'Gb4', 'G4', 'Ab4', 'A4'],
              rl: 'right'
            })}
          </div>

          <div className="sideBody">
            <Squares
              rhythm={rightRhythm}
              side='right'
              rightHighlight={rightHighlight}
              leftHighlight={leftHighlight}
            />
          </div>

        </div>

      </div>

    </main>
  );
}
