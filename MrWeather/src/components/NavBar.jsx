import React from "react";
import { Link, NavLink } from "react-router-dom";
import styles from "./NavBar.module.css";

const NavBar = (props) => {
  return (
    <header className={styles.navbar}>
      <nav>
        <ul>
          <li>
            <NavLink
              className={(navData) => (navData.isActive ? styles.active : "")}
              to="/Dashboard"
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              className={(navData) => (navData.isActive ? styles.active : "")}
              to="/Historical"
            >
              Historical
            </NavLink>
          </li>
          <h1 className="Username">Username: {props.userName}</h1>
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
