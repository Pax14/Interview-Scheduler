import { useState } from 'react';

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  // eslint-disable-next-line
  const [history, setHistory] = useState([initial]); 

  const transition = function(newMode, replace = false) {

    if (replace) {
      setMode(newMode);
    } else {
      setMode(newMode);
      history.push(newMode);
    }
  }
  
  const back = function() {
    if (history.length > 1) {
      history.pop();
      setMode(history[history.length - 1]);
    }
    setMode(history[history.length - 1]);
  }
  return { mode, transition, back };
}