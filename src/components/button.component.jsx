import React from "react";

const Button = ({ btnClass, id, sign }) => {
  return (
    <button className={btnClass + " button"} id={id} >
      {sign}
    </button>
  );
};

export default Button;
