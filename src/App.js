import React, {useEffect, useState} from 'react';
import './App.css';

function App() {

    const [tick, setTick] = useState();

    useEffect(() => {
        fetch("/api/tick")
            .then(response => response.text())
            .then(data => setTick(parseInt(data)));
    }, [])

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
