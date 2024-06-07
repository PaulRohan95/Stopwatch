import React, { useState, useEffect } from 'react';
import styles from './Stopwatch.module.css';

function Stopwatch() {

const [time, setTime] = useState(0); //state to keep track of the elapsed time  in seconds
const [running, setRunning] = useState(false); //state to determine if the stopwatch is running (boolean)


useEffect(() => {
    let timer;
    if(running) {
        //Set an interval to increment the time state every 1000 ms (1 second) if the stopwatch is running
        timer = setInterval(() => {
            setTime(prevTime => prevTime + 1);
        }, 1000);
    }
    //Cleanup the interval when the component unmounts or the effect re-runs
    return () => clearInterval(timer);
}, [running]); //The effect (state change, etc.) renders as long as running is true, i.e., as long as the timer is running

const start = () => {
    setRunning(true); //Starts the stopwatch
};

const stop = () => {
    setRunning(false); //Stops the stopwatch
};

const reset = () => {
    setRunning(false); //Resets the stopwatch
    setTime(0); //Resets the time to zero
};

const timeFormat = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `Time: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

  return (
    <div className={styles.wrapper}>
        <h1>Stopwatch</h1>
        <div className={styles.showTime}>
            {timeFormat(time)}
        </div>
        <div>
            {running ? (
                <button onClick={stop}>Stop</button>
            ) : (
                <button onClick={start}>Start</button>
            )}
            <button onClick={reset}>Reset</button>
        </div>
    </div>
  )
}

export default Stopwatch;