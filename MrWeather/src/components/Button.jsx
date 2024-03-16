import React from "react";
import Draggable from "react-draggable";
import imgFairWarm from "../img/cloud_icon/partly-cloudy-day.svg";
import imgUnknown from "../img/cloud_icon/thunderstorms.svg";

const Button = (props) => {
  const btnStyle = {
    position: "absolute", // Ensure position is absolute or fixed for left/top to work.
    left: props.btnLeft,
    top: props.btnTop,
    backgroundImage: `url(${
      props.selectArea(props.btnName).forecast === "Fair & Warm"
        ? imgFairWarm
        : imgUnknown
    })`,
    // Initial left and top set through props, but actual positioning managed by Draggable.
  };

  // Function to handle the drag stop event.
  const handleStop = (e, data) => {
    // Get the parent container dimensions
    const parentWidth = e.target.parentElement.clientWidth;
    const parentHeight = e.target.parentElement.clientHeight;

    // Calculate the new positions as percentages
    const leftPercentage = ((data.x / parentWidth) * 100).toFixed(2);
    const topPercentage = ((data.y / parentHeight) * 100).toFixed(2);

    // Log and display the new positions
    console.log(
      "New position (percentage):",
      leftPercentage + "%",
      topPercentage + "%",
      props.btnName
    );
    // Update state or props as needed with the percentage values
  };

  return (
    <Draggable
      onStop={handleStop} // Assign the event handler.
      bounds="parent" // Restrict movement within the parent container.
    >
      <button
        className={`btn ${props.btnName}`}
        name={props.btnName}
        style={btnStyle}
        onClick={(event) => {
          console.log(event.target.name);
          console.log(props.selectArea(event.target.name));
        }}
      >
        <label className="lblBtn">
          {/* Content you want to show below the button */}
          {props.btnName}
        </label>
      </button>
    </Draggable>
  );
};

export default Button;
