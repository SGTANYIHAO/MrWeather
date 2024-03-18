import React from "react";
import userInsert from "./pages/hooks/userInsert";
//import Draggable from "react-draggable";

const Button = (props) => {
  const btnStyle = {
    position: "absolute",
    left: props.btnLeft,
    top: props.btnTop,
    backgroundImage: `url(${props.selectBackgroundImage(
      props.selectArea(props.btnName).forecast
    )})`,
    transform: props.transform,
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
    <button
      className={`btn ${props.btnName}`}
      name={props.btnName}
      region={props.btnRegion}
      style={btnStyle}
      onClick={(event) => {
        props.selectArea(event.target.name);
        props.toggleVisibility();
        if (props.btnName === props.weathers.area) {
          console.log(props.weathers);

          const date = new Date();
          let localTime = date.toLocaleTimeString();
          // if false and userName not none will write into Air Table
          if (props.isDisplayVisible === false) {
            userInsert()(
              props.userName,
              props.weathers.area,
              props.weathers.psi[props.weathers.region],
              props.weathers.region,
              props.weathers.weather,
              props.weathers.update,
              localTime
            );
          }
        } else {
          props.selectArea(event.target.name);
          props.toggleVisibility();
        }
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
