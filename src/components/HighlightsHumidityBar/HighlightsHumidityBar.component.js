import React from "react";
import "./HighlightsHumidityBar.css";

export function HighlightsHumidityBar({ humidity }) {
  return (
    <div className="humidity-wrapper">
      <div className="humidity-values">
        <span>0</span>
        <span>50</span>
        <span>100</span>
      </div>
      <div className="humidity-bar-container">
        <div
          className="humidity-bar"
          style={{
            width: `${humidity}%`,
          }}
        ></div>
      </div>
      <span className="unit">%</span>
    </div>
  );
}
