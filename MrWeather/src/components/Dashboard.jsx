import React, { useState } from "react";
import map02 from "../img/Singapore_Map02.jpg";
import Display from "./Display";
import Button from "./Button";

const Dashboard = (props) => {
  const [isDisplayVisible, setIsDisplayVisible] = useState(false);

  // Function to toggle the visibility
  const toggleVisibility = () => {
    setIsDisplayVisible(!isDisplayVisible);
    if (isDisplayVisible === true) {
      //Reset
      props.setWeather([]);
    }
  };

  return (
    <>
      {/* using React Draggable Function  */}
      {isDisplayVisible && (
        <Display
          weathers={props.weathers}
          selectBackgroundImage={props.selectBackgroundImage}
        />
      )}
      <div className="container">
        {/* Import the map  */}
        <img src={map02} alt="Map of Singapore" />
        {/* Generate all map by using map function */}

        {props.locations.map((location) => (
          <Button
            selectBackgroundImage={props.selectBackgroundImage}
            key={location.area}
            btnName={location.area}
            btnLeft={location.left}
            btnTop={location.top}
            btnRegion={location.region}
            transform={location.transform}
            selectArea={props.selectArea}
            weathers={props.weathers}
            setWeather={props.setWeather}
            toggleVisibility={toggleVisibility}
          />
        ))}
      </div>
    </>
  );
};

export default Dashboard;
