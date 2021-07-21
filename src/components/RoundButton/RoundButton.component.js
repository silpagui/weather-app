import React from "react";
import "./RoundButton.styles.css";

export function RoundButton(props) {
  return (
    <button
      className={`round-button ${props.active ? "button-active" : ""}`}
      onClick={props.onClick}
    >
      {props.content}
      {props.imgSRC}
    </button>
  );
}
