import React, { useState } from 'react';
import { Slider } from '@material-ui/core';

/**
 * @name useTempo - This hook sets the tempo to be used in the app
 */
export default function useTempo() {
  const [tempo, setTempo] = useState(100);

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
      onChange={(e,v) => setTempo(v)}
    />
  ];

}
