
import React, { useEffect, useRef, useState } from 'react';
import * as Tone from 'tone';

import './App.css';


export default function Buttons () {
  const [display, setDisplay] = useState('none');
  // const displayRef = useRef('none');
  // const previousTimeRef = useRef();

  const styles = {
    square: {
      height: 75,
      width: 75,
      backgroundColor: 'magenta',
      marginLeft: 25,
      display: display,
    },
  }

  var synth = new Tone.PolySynth(Tone.Synth).toDestination();
  var synth2 = new Tone.PolySynth(Tone.Synth).toDestination();

  new Tone.Loop(time => {
    // displayRef.current = 'inline';
    synth.triggerAttackRelease("F3", '16n', time);
    // setDisplay(current => 'inline')
    console.log(time)
  }, 22).start(0);

  // new Tone.Loop(time => setDisplay(current => 'none'), 22).start(.25)

  new Tone.Loop(time => {
    synth2.triggerAttackRelease("C4", '16n', time);
  }, 23).start(0);


  const setTimers = async () => {
    await Tone.start();
    playSynth();
  }

  const playSynth = () => {
    Tone.Transport.bpm.value = 10000;
    Tone.Transport.start();
  }

  const stop = () => {
    Tone.Transport.stop();
  }

  useEffect(() => {

  })

  return (
    <div id='wrapper'>
      <button id='button' onClick={setTimers}>Start</button>
      <button id='button' onClick={stop}>Stop</button>
      <div style={styles.square}></div>
    </div>
  );
}




