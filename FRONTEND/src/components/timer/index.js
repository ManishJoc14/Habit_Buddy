import React, { useEffect, useState } from "react";
import { useTimer, useTime, useStopwatch } from "react-timer-hook";
import "./timer.css";

const TimerComponent = ({ mins, setIsTimerVisibe }) => {
  const time = new Date();
  const secs = mins * 60;
  time.setSeconds(time.getSeconds() + secs); // 5 minutes timer

  const { seconds, minutes, hours, days, pause, resume, restart } = useTimer({
    time,
    onExpire: () => alert("Timer Expired"),
  });
  const end = () => {
    setIsTimerVisibe(false);
  };
  useEffect(() => {
    const time = new Date();
    time.setSeconds(time.getSeconds() + secs);
    restart(time);
  }, [secs, restart]);
  return (
    <div style={{ textAlign: "center" }}>
      <p style={{ fontSize: "20px" }}>Timer</p>
      <div className="timerTime">
        <span>{days}</span>:<span>{hours}</span>:<span>{minutes}</span>:
        <span>{seconds}</span>
      </div>
      <div className="timerBtn">
        <button
          className="timerButtons"
          onClick={() => {
            // Restarts to 5 minutes timer
            const time = new Date();
            time.setSeconds(time.getSeconds() + secs);
            restart(time);
          }}
        >
          Start
        </button>
        <button onClick={pause} className="timerButtons">
          Pause
        </button>
        <button onClick={resume} className="timerButtons">
          Resume
        </button>
        <button onClick={end} className="timerButtons">
          End
        </button>
      </div>
    </div>
  );
};

const Timer = () => {
  const [timerValue, setTimerValue] = useState(5);
  const [isTimerVisible, setIsTimerVisibe] = useState(false);
  const handleChangeTimerValue = (e) => {
    setTimerValue(e.target.value);
  };
  const handleSet = () => {
    setIsTimerVisibe(true);
  };
  return (
    <>
      <Time />
      {!isTimerVisible ? (
        <div className="timerMain">
          <label htmlFor="timerInput" style={{ fontSize: "22px" }}>
            Timer
          </label>
          <Input
            name="timerInput"
            placeholder="Enter value in minuetes"
            value={timerValue}
            handler={handleChangeTimerValue}
          />
          <label htmlFor="timerInput" style={{ fontSize: "12px" }}>
            Enter value in minutes
          </label>
          <button className="timerButtons startButtons mt-5" onClick={handleSet}>
            Start Timer
          </button>
        </div>
      ) : (
        <TimerComponent mins={timerValue} setIsTimerVisibe={setIsTimerVisibe} />
      )}
      <Stopwatch />
    </>
  );
};
export default Timer;

const Stopwatch = () => {
  const [isStopWatchVisible, setIsStopWatchVisibe] = useState(false);
  const handleSet = () => {
    setIsStopWatchVisibe(true);
  };
  return (
    <>
      {!isStopWatchVisible ? (
        <div className="timerMain mt-10">
          <button className="timerButtons startButtons mt-5" onClick={handleSet}>
            Start Stopwatch
          </button>
        </div>
      ) : (
        <StopwatchComponent setIsStopWatchVisibe={setIsStopWatchVisibe} />
      )}
    </>
  );
};

const StopwatchComponent = ({ setIsStopWatchVisibe }) => {
  const { seconds, minutes, hours, days, start, pause, reset } = useStopwatch({
    autoStart: true,
  });
  const end = () => {
    setIsStopWatchVisibe(false);
  };
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <p style={{ fontSize: "20px" }}>StopWatch</p>
      <div className="timerTime">
        <span>{days}</span>:<span>{hours}</span>:<span>{minutes}</span>:
        <span>{seconds}</span>
      </div>
    
      <div className="timerBtn">
        <button onClick={start} className="timerButtons">
          Start
        </button>
        <button onClick={pause} className="timerButtons">
          Pause
        </button>
        <button onClick={reset} className="timerButtons">
          Reset
        </button>
        <button onClick={end} className="timerButtons">
          End
        </button>
      </div>
    </div>
  );
};

const Time = () => {
  const { seconds, minutes, hours, ampm } = useTime({ format: "12-hour" });
  return (
    <div style={{ textAlign: "end", marginBottom: "15px" }}>
      <div style={{ fontSize: "20px" }}>
        <span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
        <span>{ampm}</span>
      </div>
    </div>
  );
};

const Input = ({ name, placeholder, value, handler }) => {
  return (
    <>
      <input
        type="number"
        className="timerValueInput"
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={handler}
      />
    </>
  );
};
