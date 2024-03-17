import React from "react";
import Draggable from "react-draggable";

const Button = (props) => {
  // Image selection function

  const btnStyle = {
    position: "absolute", // Ensure position is absolute or fixed for left/top to work.
    left: props.btnLeft,
    top: props.btnTop,
    backgroundImage: `url(${props.selectBackgroundImage(
      props.selectArea(props.btnName).forecast
    )})`,
    transform: props.transform,
    // Initial left and top set through props, but actual positioning managed by Draggable.
  };

  // Function to handle the drag stop event.
  const handleStop = (e, data) => {
    // Calculate translate values in pixels directly
    const translateX = data.x.toFixed(2);
    const translateY = data.y.toFixed(2);

    console.log(`translate(${translateX}px, ${translateY}px)`, props.btnName);
    // Update state or props as needed with the percentage values
  };

  return (
    /*     <Draggable
      onStop={handleStop} // Assign the event handler.
      bounds="parent" // Restrict movement within the parent container.
    > */
    <button
      className={`btn ${props.btnName}`}
      name={props.btnName}
      region={props.btnRegion}
      style={btnStyle}
      onClick={(event) => {
        //console.log(event.target.name);

        props.toggleVisibility();
        props.selectArea(event.target.name);
      }}
    >
      <label className="lblBtn">
        {/* Content you want to show below the button */}
        {props.btnName}
      </label>
    </button>
    // </Draggable>
  );
};

export default Button;
