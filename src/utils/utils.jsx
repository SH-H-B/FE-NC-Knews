import React from "react";

const Button = props => {
  return (
    <button
      className={props.className}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.icon}
      {props.buttonText}
    </button>
  );
};

export default Button;
