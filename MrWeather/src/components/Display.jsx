import React from "react";
import Draggable from "react-draggable";
import rain from "../img/cloud_icon/clear-day.svg";
import styles from "./Display.module.css";

const Display = (props) => {
  return (
    <Draggable>
      <div className={styles.display}>
        <div className={styles.gridContainer}>
          <h1>{props.weathers.area}</h1>
          <label>{props.weathers.weather}</label>
          <img src={props.selectBackgroundImage(props.weathers.weather)}></img>

          <label2 className="psi">
            PSI: {props.weathers.psi[props.weathers.region]}
          </label2>
          <label3 className="region">Region: {props.weathers.region}</label3>
        </div>
      </div>
    </Draggable>
  );
};

export default Display;
