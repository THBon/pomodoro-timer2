import React from "react";
import {minutesToDuration} from "../utils/duration";

function Break ({increaseBreak, decreaseBreak, breakDuration, deactivateButton}) {
    return (
        <div className="col">
        <div className="float-right">
          <div className="input-group input-group-lg mb-2">
            <span className="input-group-text" data-testid="duration-break">
              Break Duration: {minutesToDuration(breakDuration)}
            </span>
            <div className="input-group-append">
              {/* TODO: Implement decreasing break duration DONE
              and disable during a focus or break session*/}
              <button
                type="button"
                className="btn btn-secondary"
                data-testid="decrease-break"
                onClick={decreaseBreak}
                disabled={deactivateButton}
              >
                <span className="oi oi-minus" />
              </button>
              {/* TODO: Implement increasing break duration DONE
              and disable during a focus or break session*/}
              <button
                type="button"
                className="btn btn-secondary"
                data-testid="increase-break"
                onClick={increaseBreak}
                disabled={deactivateButton}
              >
                <span className="oi oi-plus" />
              </button>
            </div>
          </div>
        </div>
      </div>
    )
}

export default Break;