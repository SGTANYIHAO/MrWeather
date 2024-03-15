import React from "react";
import Draggable from "react-draggable"; // installed react-draggable

const Display = () => {
  return (
    <>
      <Draggable>
        <div className="display">Drag me around</div>
      </Draggable>
    </>
  );
};

export default Display;
