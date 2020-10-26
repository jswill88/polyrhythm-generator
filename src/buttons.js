import React, { useEffect, useState } from 'react';
import * as Tone from 'tone';

import './App.css';


export default function Buttons() {

  const [display, setDisplay] = useState('none');
  const [display2, setDisplay2] = useState('none');
  const [leftRhythm, setLeftRhythm] = useState(2);
  const [rightRhythm, setRightRhythm] = useState(3);
  const [leftLoop, setLeftLoop] = useState();

  const styles = {

    square: {
      height: 75,
      width: 75,
      backgroundColor: 'magenta',
      marginLeft: 25,
      display: display,
    },

    square2: {
      height: 75,
      width: 75,
      backgroundColor: 'green',
      marginRight: 25,
      display: display2,
    },
  }

  // useEffect( () => {
    // let loop1 = new Tone.Loop(time => {
    //   synth.triggerAttackRelease("F3", '16n', time);

    //   Tone.Draw.schedule(() => {

    //     setDisplay(prev => prev === 'block' ? 'none' : 'block')
    //     console.log(time);
    //   }, time)
    //     .schedule(() => {
    //       setDisplay('none')

    //     }, time + .15);
    // }, leftRhythm).start(.05);

    // let loop2 = new Tone.Loop(time => {
    //   synth2.triggerAttackRelease("C4", '16n', time);
    //   Tone.Draw.schedule(() => {
    //     setDisplay2(prev => prev === 'block' ? 'none' : 'block')
    //     console.log(time);
    //   }, time)
    //     .schedule(() => {
    //       setDisplay2('none')
    //     }, time + .15);

    // }, rightRhythm).start(.05);

    // var synth = new Tone.PolySynth(Tone.Synth).toDestination();
    // var synth2 = new Tone.PolySynth(Tone.Synth).toDestination();

    // return () => { loop1.dispose(); loop2.dispose() };
  // }, [leftRhythm, rightRhythm])



  const setTimers = async () => {
    var synth = new Tone.PolySynth(Tone.Synth).toDestination();
    var synth2 = new Tone.PolySynth(Tone.Synth).toDestination();
  
    let leftLoop = new Tone.Loop(time => {
      synth.triggerAttackRelease("F3", '16n', time);
  
      Tone.Draw.schedule(() => {
  
        setDisplay(prev => prev === 'block' ? 'none' : 'block')
        console.log(time);
      }, time)
        .schedule(() => {
          setDisplay('none')
  
        }, time + .15);
    }, leftRhythm).start(.05);
    
    setLeftLoop(leftLoop);
  
    new Tone.Loop(time => {
      synth2.triggerAttackRelease("C4", '16n', time);
      Tone.Draw.schedule(() => {
        setDisplay2(prev => prev === 'block' ? 'none' : 'block')
        console.log(time);
      }, time)
        .schedule(() => {
          setDisplay2('none')
        }, time + .15);
  
    }, rightRhythm).start(.05);

    await Tone.start();
    Tone.setContext(new Tone.Context({ latencyHint: "playback" }))
    playSynth();
  }

  const playSynth = () => {

    console.log(rightRhythm);
    Tone.Transport.bpm.value = leftRhythm * 120;
    Tone.Transport.start();
  }

  const stop = () => {
    Tone.Transport.stop();
  }

  const handleLeft = event => setLeftRhythm(event.target.value);
  const handleRight = event => setRightRhythm(event.target.value);

  return (
    <div id='wrapper'>
      <button id='button' onClick={setTimers}>Start</button>
      <button id='button' onClick={stop}>Stop</button>
  
      <div style={styles.square2}></div>
      <div style={styles.square}></div>
      <input type="number" defaultValue={2} onChange={handleLeft}/> 
      <input type="number" defaultValue={3} onChange={handleRight}/> 
    </div>
  );
}




