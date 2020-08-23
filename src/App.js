import React, {useState} from 'react';
import './App.css';

function App() {

    const [tick, setTick] = useState();
    fetch("/api/tick")
        .then(r => r.text())
        .then(d => setTick(d));

    const increaseTick = () => {
        fetch("/api/tick", {
            method: "POST"
        });
        setTick(tick + 1);
    }

  return (
    <div className="App">
        <div>Number of ticks: {tick}</div>
        <button onClick={increaseTick}>increase</button>
    </div>
  );
}

export default App;
