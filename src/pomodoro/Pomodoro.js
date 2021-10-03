import React, { useState } from "react";
import useInterval from "../utils/useInterval";
import Focus from "./Focus";
import Break from "./Break";
import PlayPause from "./PlayPause";
import Session from "./Session";

// These functions are defined outside of the component to insure they do not have access to state
// and are, therefore more likely to be pure.

/**
 * Update the session state with new state after each tick of the interval.
 * @param prevState
 *  the previous session state
 * @returns
 *  new session state with timing information updated.
 */
function nextTick(prevState) {
  const timeRemaining = Math.max(0, prevState.timeRemaining - 1);
  return {
    ...prevState,
    timeRemaining,
  };
}

/**
 * Higher order function that returns a function to update the session state with the next session type upon timeout.
 * @param focusDuration
 *    the current focus duration
 * @param breakDuration
 *    the current break duration
 * @returns
 *  function to update the session state.
 */
function nextSession(focusDuration, breakDuration) {
  /**
   * State function to transition the current session type to the next session. e.g. On Break -> Focusing or Focusing -> On Break
   */
  return (currentSession) => {
    if (currentSession.label === "Focusing") {
      return {
        label: "On Break",
        timeRemaining: breakDuration * 60,
      };
    }
    return {
      label: "Focusing",
      timeRemaining: focusDuration * 60,
    };
  };
}

function Pomodoro() {
  // Timer starts out paused
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  // The current session - null where there is no session running
  const [session, setSession] = useState(null);
  //The length of focus (default 25)
  const [focusDuration, setFocusDuration] = useState(25);
  //The length of break (default 5)
  const [breakDuration, setBreakDuration] = useState(5);
  //Deactivate timer button, if true button will deactivate
  const [deactivateButton, setDeactivateButton] = useState(false);
  //The state of the stop button
  const [deactivateStop, setDeactivateStop] = useState(true);

  const increaseFocus = () => {
    setFocusDuration(Math.min(60, focusDuration + 5));
  }

  const decreaseFocus = () => {
    setFocusDuration(Math.max(5, focusDuration - 5));
  }

  const increaseBreak = () => {
    setBreakDuration(Math.min(15, breakDuration + 1));
  }

  const decreaseBreak = () => {
    setBreakDuration(Math.max(1, breakDuration - 1));
  }



  /**
   * Custom hook that invokes the callback function every second
   *
   * NOTE: You will not need to make changes to the callback function
   */
  useInterval(() => {
      if (session.timeRemaining === 0) {
        new Audio("https://bigsoundbank.com/UPLOAD/mp3/1482.mp3").play();
        return setSession(nextSession(focusDuration, breakDuration));
      }
      return setSession(nextTick);
    },
    isTimerRunning ? 1000 : null
  );

  /**
   * Called whenever the play/pause button is clicked.
   */
  function playPause() {
    setDeactivateButton(true);
    setDeactivateStop(false);
    setIsTimerRunning((prevState) => {
      const nextState = !prevState;
      if (nextState) {
        setSession((prevStateSession) => {
          // If the timer is starting and the previous session is null,
          // start a focusing session.
          if (prevStateSession === null) {
            return {
              label: "Focusing",
              timeRemaining: focusDuration * 60,
            };
          }
          return prevStateSession;
        });
      }
      return nextState;
    });
  }

  function stopHandler() {
    setIsTimerRunning(false);
    setSession(null);
    setFocusDuration(25);
    setBreakDuration(5);
    setDeactivateButton(false);
    setDeactivateStop(true);
  }

  return (
    <div className="pomodoro">
      <div className="row">
        <Focus increaseFocus={increaseFocus} decreaseFocus={decreaseFocus} focusDuration={focusDuration} deactivateButton={deactivateButton} />
        <Break increaseBreak={increaseBreak} decreaseBreak={decreaseBreak} breakDuration={breakDuration} deactivateButton={deactivateButton} />
      </div>
      <div className="row">
        <PlayPause playPause={playPause} isTimerRunning={isTimerRunning} stopHandler={stopHandler} deactivateStop={deactivateStop} />
      </div>
      <Session session={session} focusDuration={focusDuration} breakDuration={breakDuration} />
    </div>
  );
}

export default Pomodoro;
