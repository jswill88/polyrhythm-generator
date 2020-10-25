import React, { useState, useRef } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);

  const requestRef = useRef();

  const previousTimeRef = useRef();

  const animate = time => {

    if (previousTimeRef.current) {

      const deltaTime = time - previousTimeRef.current;

      setCount(prevCount => prevCount + deltaTime * .001);
    }

    previousTimeRef.current = time;

    requestRef.current = requestAnimationFrame(animate);
  }
  
  const startCounter = () => {
    requestRef.current = requestAnimationFrame(animate);
  }
  const stopCounter = () => {

    cancelAnimationFrame(requestRef.current);

    previousTimeRef.current = undefined;
  }

  return (
    <>
    <button id="button" onClick={startCounter}>Start Counter</button>
    <button id="button" onClick={stopCounter}>Stop Counter</button>
    <div>{Math.round(count)}</div>
    </>
  )
}