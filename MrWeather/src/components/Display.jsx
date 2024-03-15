import React from "react";
import Draggable from "react-draggable"; // installed react-draggable

const Display = (props) => {
  return (
    <>
      <Draggable>
        <div className="display">
          <h2>{props.weather[32].area}</h2>
          <h3>{props.weather[32].forecast}</h3>
        </div>
      </Draggable>
    </>
  );
};

export default Display;
