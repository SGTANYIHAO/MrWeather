import React from "react";
import map02 from "../img/Singapore_Map02.jpg";

import Display from "./Display";

import { ReactComponent as YourSvg } from "../img/cloud_icon/rain.svg";

const Dashboard = () => {
  return (
    <>
      <Display></Display>

      <div className="container">
        <img src={map02} alt="Map of Singapore" />

        <button className="btn Sembawang">
          <YourSvg />
        </button>
      </div>
    </>
  );
};

export default Dashboard;
