import React, { useEffect, useState } from 'react';
import * as Tone from 'tone';
import { Slider } from '@material-ui/core';
import { StylesProvider } from "@material-ui/core/styles";
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import StopIcon from '@material-ui/icons/Stop';

import '../styles/App.scss';
import Squares from './Squares';
import Notes from './Notes';

export default function Main({ showInfo }) {

  const [leftRhythm, setLeftRhythm] = useState(3);
  const [rightRhythm, setRightRhythm] = useState(4);
  const [tempo, setTempo] = useState(100);
  const [leftHighlight, setLeftHighlight] = useState(-1);
  const [rightHighlight, setRightHighlight] = useState(-1);
  const [leftNote, setLeftNote] = useState('C4')
  const [rightNote, setRightNote] = useState('F3')
  const [leftError, setLeftError] = useState(false);
  const [rightError, setRightError] = useState(false);
  const [volume, setVolume] = useState(-30);

  const setTimers = async () => {
    setLeftHighlight(-1);
    setRightHighlight(-1);
    await Tone.start();
    Tone.Transport.start('+0.1');
  }


  useEffect(() => {

    const leftPanner = new Tone.Panner(.85).toDestination();
    const rightPanner = new Tone.Panner(-.85).toDestination();
    const synth = new Tone.PolySynth(Tone.Synth).connect(leftPanner)
    const synth2 = new Tone.PolySynth(Tone.Synth).connect(rightPanner)

    let lLoop = new Tone.Loop(time => {

      synth.triggerAttackRelease(leftNote, '32n', time);
      Tone.Draw.schedule(() => {
        setLeftHighlight(prev => (prev + 1) % rightRhythm)
      }, time)

    }, `0:${leftRhythm}`).start(.05)

    let rLoop = new Tone.Loop(time => {

      synth2.triggerAttackRelease(rightNote, '32n', time);
      Tone.Draw.schedule(() => {

        setRightHighlight(prev => (prev + 1) % leftRhythm)
      }, time)

    }, `0:${rightRhythm}`).start(.05)


    Tone.Transport.bpm.value = rightRhythm * tempo;

    return () => {
      lLoop.cancel()
      rLoop.cancel();

    }

  }, [rightRhythm, leftRhythm, leftNote, rightNote, tempo])

  useEffect(() => {
    if (volume < -50) {
      Tone.Destination.volume.value = -1000;
    } else {
      Tone.Destination.volume.value = volume;
    }
  }, [volume])

  const stop = () => {
    unhighlight();
    Tone.Transport.stop();
  }
  const unhighlight = () => {
    setLeftHighlight(-2)
    setRightHighlight(-2)
  }

  const handleLeft = event => {
    if (event.target.value > 1) {
      setLeftError(false);
      setLeftRhythm(event.target.value)
    } else {
      setLeftError(true);
    }
  };

  const handleRight = event => {
    if (event.target.value > 1 &&
      event.target.value <= Math.floor(parseInt(leftRhythm) * 6)) {
      setRightError(false);
      setRightRhythm(event.target.value)
    } else {
      setRightError(true);
    }
  };

  const handleTempo = (e, value) => {
    Tone.Transport.bpm.value = value * rightRhythm;
    setTempo(value)
  }

  const handleVolume = (e, value) => {
    setVolume(value)
  }
  const Thumb = (props) => {
    console.log(props)
    return (
    <span {...props}>
      {props['aria-label'] === 'tempo'
      ? props['aria-valuenow']
      : (props['aria-valuenow'] + 55) / 5
      }
      </span>)
  };

  return (
    <main>
      <section className="globalControls">
        <StylesProvider injectFirst>
          <div
            title="Set the tempo for the base rhythm"
            className={"control"}
          >
            <label htmlFor="tempo">BPM</label>
            <Slider
              name="tempo"
              aria-label="tempo"
              min={40}
              max={150}
              step={1}
              value={tempo}
              onChange={handleTempo}
              ThumbComponent={Thumb}
            />
          </div>
          <div
            title="Set the master volume"
            className={"control"}
          >
            <label htmlFor="volume">Volume</label>
            <Slider
              name="volume"
              aria-label="volume"
              min={-55}
              max={-15}
              step={5}
              value={volume}
              onChange={handleVolume}
              ThumbComponent={Thumb}
            />
          </div>
          <div title="Start and stop the music" className={"control"}>
            {rightHighlight > -1
              ? <button id='button' className="stop" onClick={stop}>
                <StopIcon /></button>
              : <button id='button' onClick={setTimers}>
                <PlayArrowIcon /></button>
            }
          </div>
        </StylesProvider>
      </section>

      <div className="container">

        <div className="blinkBox">

          <div className="subtitle">
            <h2>Base Rhythm</h2>
          </div>

          <div className="sideHeader">

            <div
              className={"sideControl"}
              title="Set the number of beats in the base rhythm"
            >

              <label htmlFor="leftSub">Beats:</label>

              <input
                className={leftError ? 'error' : null}
                id="leftSub"
                type="number"
                min="2"
                defaultValue={leftRhythm}
                onChange={handleLeft}
              />
            </div>

            <div
              className={"sideControl"}
              title="Set the pitch of the left note"
            >
              {leftError
                ? <p>Input must be 2 or greater</p>
                : Notes({
                  noteArray: ['Bb2', 'B2', 'C3', 'Db3', 'D3', 'Eb3', 'E3', 'F3', 'Gb3', 'G3', 'Ab3', 'A3'],
                  rl: 'left',
                  leftNote,
                  rightNote,
                  setLeftNote,
                  setRightNote,
                  showInfo
                })}
            </div>
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
          <div className="subtitle">

            <h2>Cross Rhythm</h2>
          </div>

          <div className="sideHeader">

            <div
              className="sideControl"
              title="Set the number of beats in the cross rhythm">
              <label htmlFor="rightSub">Beats:</label>

              <input
                className={rightError ? 'error' : null}
                id="rightSub"
                type="number"
                min="2"
                max={Math.floor(parseInt(leftRhythm) * 6)}
                defaultValue={rightRhythm}
                onChange={handleRight} />
            </div>

            <div className={"sideControl"}
              title="Set the pitch of the right note">
              {rightError
                ? <p>
                  Input must be between 2 and {Math.floor(parseInt(leftRhythm) * 6)}
                </p>
                : Notes({
                  noteArray: ['Bb3', 'B3', 'C4', 'Db4', 'D4', 'Eb4', 'E4', 'F4', 'Gb4', 'G4', 'Ab4', 'A4'],
                  rl: 'right',
                  leftNote,
                  rightNote,
                  setLeftNote,
                  setRightNote,
                  showInfo
                })
              }
            </div>

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
