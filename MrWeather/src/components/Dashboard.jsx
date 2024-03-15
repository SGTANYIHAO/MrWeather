import React from "react";
import map02 from "../img/Singapore_Map02.jpg";
import Display from "./Display";

const Dashboard = (props) => {
  return (
    <>
      {/* using React Draggable Function  */}
      <Display weather={props.weather} />
      <div className="container">
        {/* Import the map  */}
        <img src={map02} alt="Map of Singapore" />
        {/* Generate all map by using map function */}
        <button
          className="btn Sembawang"
          name="Sembawang"
          onClick={(event) => {
            console.log(event.target.name);
          }}
        />
      </div>
    </>
  );
};

export default Dashboard;
