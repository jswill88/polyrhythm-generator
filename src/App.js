import * as Tone from 'tone';

import './App.css';

const playSynth = async () =>{
  await Tone.start();
  var synth = new Tone.PolySynth(Tone.Synth).toDestination();
  var synth2 = new Tone.PolySynth(Tone.Synth).toDestination();
  
  new Tone.Loop(time => {
    synth.triggerAttackRelease("F3", '16n', time);
  }, 6).start(0);
  
  new Tone.Loop(time => {
    synth2.triggerAttackRelease("C4", '16n', time);
  }, 7).start(0);
  
  Tone.Transport.bpm.value = 1000;
  Tone.Transport.start();
} 
const stop = () => {
  Tone.Transport.stop();
}

function App() {
  return (
    <div id='wrapper'>
      <button id='button' onClick={playSynth}>Start</button>
      <button id='button' onClick={stop}>Stop</button>
    </div>
  );
}

export default App;
