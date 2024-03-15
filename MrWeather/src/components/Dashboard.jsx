import React from "react";
import map02 from "../img/Singapore_Map02.jpg";
import Display from "./Display";

const Dashboard = () => {
  return (
    <>
      {/* using React Draggable Function  */}
      <Display />
      <div className="container">
        {/* Import the map  */}
        <img src={map02} alt="Map of Singapore" />
        {/* Generate all map by using map function */}
        <button className="btn Sembawang" />
      </div>
    </>
  );
};

export default Dashboard;
