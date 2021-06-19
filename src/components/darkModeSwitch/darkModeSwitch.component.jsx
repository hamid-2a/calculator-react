import React from "react";
import "./darkModeSwitch.styles.scss";
import sun_icon from "../../../styles/icons/sun.png";
import moon_icon from "../../../styles/icons/moon.png";

const DarkmodeSwitch = ({ isDark }) => {
  return (
    <div className="darkMode-container">
      <div className="icons">
        <img src={sun_icon} alt="sun" />
        <img src={moon_icon} alt="moon" />
      </div>
      <label className="switch">
        <input type="checkbox" id="modeSwitch" defaultChecked={isDark} />
        <span className="slider round"></span>
      </label>
    </div>
  );
};

export default DarkmodeSwitch;
