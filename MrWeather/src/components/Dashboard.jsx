import React from "react";
import map02 from "../img/Singapore_Map02.jpg";
import Display from "./Display";
import Button from "./Button";

const Dashboard = (props) => {
  return (
    <>
      {/* using React Draggable Function  */}
      <Display weather={props.weather} />
      <div className="container">
        {/* Import the map  */}
        <img src={map02} alt="Map of Singapore" />
        {/* Generate all map by using map function */}

        {props.locations.map((location) => (
          <Button
            btnName={location.area}
            btnLeft={location.left}
            btnTop={location.top}
          />
        ))}
      </div>
    </>
  );
};

export default Dashboard;
