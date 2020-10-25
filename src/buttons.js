import React, { useEffect, useState } from 'react';
import * as Tone from 'tone';

import './App.css';


export default function Buttons() {
  const [display, setDisplay] = useState('none');
  const [display2, setDisplay2] = useState('none');
  // const display = useRef('inline')
  // const displayRef = useRef('inline');
  // const previousTimeRef = useRef();

  // const requestRef = useRef();

  // const previousTimeRef = useRef(0);

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
  useEffect(() => {
    new Tone.Loop(time => {
      // displayRef.current = 'inline';
      synth.triggerAttackRelease("F3", '16n', time);
      // setDisplay(current => 'inline')

      Tone.Draw.schedule(() => {
        // do drawing or DOM manipulation here
        setDisplay(prev => prev === 'inline' ? 'none' : 'inline')
        // displayRef.current = displayRef.current === 'none' ? 'inline' : 'none'
        console.log(time);
      }, time)
        .schedule(() => {
          // do drawing or DOM manipulation here
          setDisplay('none')
          // displayRef.current = displayRef.current === 'none' ? 'inline' : 'none'

        }, time + .15);
    }, 7).start(.05);

    new Tone.Loop(time => {
      synth2.triggerAttackRelease("C4", '16n', time);
      Tone.Draw.schedule(() => {
        // do drawing or DOM manipulation here
        setDisplay2(prev => prev === 'inline' ? 'none' : 'inline')
        // displayRef.current = displayRef.current === 'none' ? 'inline' : 'none'
        console.log(time);
      }, time)
        .schedule(() => {
          // do drawing or DOM manipulation here
          setDisplay2('none')
          // displayRef.current = displayRef.current === 'none' ? 'inline' : 'none'

        }, time + .15);


    }, 5).start(.05);

    // const animate = time => {

    //   console.log(previousTimeRef.current)

    //   // if(!(time * 1000 % 22)) {
    //     // if (previousTimeRef.current) {
    //       if(time - previousTimeRef.current > 1000) {

    //         setDisplay(prev => prev === 'none' ? 'inline' : 'none');
    //         previousTimeRef.current = time;
    //       }
    //     // }  



    //   // }
    //   requestRef.current = requestAnimationFrame(animate);

    // }
    var synth = new Tone.PolySynth(Tone.Synth).toDestination();
    var synth2 = new Tone.PolySynth(Tone.Synth).toDestination();

  }, [])



  const setTimers = async () => {
    await Tone.start();
    Tone.setContext(new Tone.Context({ latencyHint: "playback" }))
    playSynth();
  }
  // new Draw(time => console.log(time))

  const playSynth = () => {
    // requestRef.current = requestAnimationFrame(animate);
    // Tone.Transport.scheduleRepeat((time) => {
    //   // use the time argument to schedule a callback with Draw
    //   Tone.Draw.schedule(() => {
    //     // do drawing or DOM manipulation here
    //     // setDisplay(prev => prev === 'none' ? 'inline' : 'none')
    //     display.current = display.current === 'none' ? 'inline' : 'none'
    //     console.log(time);
    //   }, time);

    // }, 4/2);

    Tone.Transport.bpm.value = 800;
    Tone.Transport.start();
  }

  const stop = () => {
    Tone.Transport.stop();
  }

  return (
    <div id='wrapper'>
      <button id='button' onClick={setTimers}>Start</button>
      <button id='button' onClick={stop}>Stop</button>
      <br/>
      <div style={styles.square2}></div>
      <div style={styles.square}></div>
    </div>
  );
}




