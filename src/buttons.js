import React, { useEffect, useState } from 'react';
import * as Tone from 'tone';

import './App.css';


export default function Buttons() {

  const [display, setDisplay] = useState('none');
  const [display2, setDisplay2] = useState('none');
  const [leftRhythm, setLeftRhythm] = useState(4);
  const [rightRhythm, setRightRhythm] = useState(3);
  const [leftLoop, setLeftLoop] = useState(null);
  const [rightLoop, setRightLoop] = useState(null);

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
    var synth = new Tone.PolySynth(Tone.Synth).toDestination();
    var synth2 = new Tone.PolySynth(Tone.Synth).toDestination();

    let lLoop = new Tone.Loop(time => {
      synth.triggerAttackRelease("F3", '64n', time);

      Tone.Draw.schedule(() => {

        setDisplay(prev => prev === 'block' ? 'none' : 'block')

        console.log(time);

      }, time)
        .schedule(() => {

          setDisplay('none')

        }, time + .15);
    }, leftRhythm * rightRhythm ).start(.05);

    lLoop.playbackRate = rightRhythm;

    setLeftLoop(lLoop);

    let rLoop = new Tone.Loop(time => {
      synth2.triggerAttackRelease("C4", '64n', time);
      Tone.Draw.schedule(() => {
        setDisplay2(prev => prev === 'block' ? 'none' : 'block')
        console.log(time);
      }, time)
        .schedule(() => {
          setDisplay2('none')
        }, time + .15);

    }, leftRhythm * rightRhythm).start(.05);
    rLoop.playbackRate = leftRhythm;

    setRightLoop(rLoop)
  }, [])

  const setTimers = async () => {

    await Tone.start();
    Tone.setContext(new Tone.Context({ latencyHint: 'playback' }))
    
    leftLoop.start(.05)
    rightLoop.start(.05)
    Tone.Transport.start();
    Tone.Transport.bpm.value = 120 * leftRhythm;
    playSynth();
  }
  
  useEffect(() => {
    if (leftLoop && rightLoop) {
      leftLoop.interval = leftRhythm * rightRhythm;
      rightLoop.interval = leftRhythm * rightRhythm;
      leftLoop.playbackRate = leftRhythm;
      rightLoop.playbackRate = rightRhythm;
      // Tone.Transport.bpm.value = 360 * leftRhythm;
    }
  }, [leftRhythm, rightRhythm])
  
  
  
  const playSynth = () => {
    // leftLoop.stop()
    // rightLoop.stop()
    // Tone.Transport.stop();
    // Tone.Transport.timeSignature = leftRhythm * rightRhythm;
    // leftLoop.interval = leftRhythm * rightRhythm;
    // rightLoop.interval = leftRhythm * rightRhythm;
    // leftLoop.playbackRate = leftRhythm;
    // rightLoop.playbackRate = rightRhythm;
    // Tone.Transport.bpm.value = 100 * leftRhythm;
    // leftLoop.start(.05)
    // rightLoop.start(.05)
    // Tone.Transport.start();
    // console.log(Tone.Transport.timeSignature)
    // leftLoop.playbackRate = rightRhythm;
    // rightLoop.playbackRate = leftRhythm;

  }

  const stop = () => {
    leftLoop.stop()
    rightLoop.stop()
    Tone.Transport.stop();
    Tone.Transport.position = 0;
    Tone.Transport.cancel();
  }

  const handleLeft = event => setLeftRhythm(event.target.value);
  const handleRight = event => setRightRhythm(event.target.value);

  return (
    <div id='wrapper'>
      <section>

        <button id='button' onClick={setTimers}>Start</button>
        <button id='button' onClick={stop}>Stop</button>
      </section>

      <input type="number" defaultValue={4} onChange={handleLeft} />
      <input type="number" defaultValue={3} onChange={handleRight} />

      <div style={styles.square2}></div>
      <div style={styles.square}></div>

    </div>
  );
}




