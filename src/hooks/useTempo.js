import React, { useState } from 'react';
import { Slider } from '@material-ui/core';

/**
 * @name useTempo - This hook sets the tempo to be used in the app
 */
export default function useTempo() {
  const [tempo, setTempo] = useState(100);
  // const [value, setValue] = useState(100)

  // const Thumb = memo(props => {
  //   return (
  //     <span {...props}>
  //       <span>
  //         {props['aria-valuenow']}
  //       </span>
  //     </span>
  //     )
  // });

  return [
    tempo,
    <Slider
      className="tempo"
      name="tempo"
      aria-label="tempo"
      min={40}
      max={150}
      step={1}
      value={tempo}
      // value={value}
      // onChangeCommitted={(e,v) => { setTempo(v); setValue(v); }}
      // onChange={(e,v) => setValue(v)}
      onChange={(e,v) => setTempo(v)}
      // ThumbComponent={Thumb}
    />
  ];

}
