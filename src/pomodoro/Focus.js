import React from "react";
import {minutesToDuration} from "../utils/duration";

function Focus({increaseFocus, decreaseFocus, focusDuration, deactivateButton}) {
    return (
        <div className="col">
        <div className="input-group input-group-lg mb-2">
          <span className="input-group-text" data-testid="duration-focus">
            Focus Duration: {minutesToDuration(focusDuration)}
          </span>
          <div className="input-group-append">
            {/* TODO: Implement decreasing focus duration DONE 
            and disable during a focus or break session */}
            <button
              type="button"
              className="btn btn-secondary"
              data-testid="decrease-focus"
              onClick={decreaseFocus}
              disabled={deactivateButton}
            >
              <span className="oi oi-minus" />
            </button>
            {/* TODO: Implement increasing focus duration DONE 
            and disable during a focus or break session */}
            <button
              type="button"
              className="btn btn-secondary"
              data-testid="increase-focus"
              onClick={increaseFocus}
              disabled={deactivateButton}
            >
              <span className="oi oi-plus" />
            </button>
          </div>
        </div>
      </div>
    )
}

export default Focus;