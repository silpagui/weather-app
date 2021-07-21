import React from "react";
import "./Cloud.styles.css";

export function Cloud({ className }) {
  const cloudsCircle = [1, 2, 3, 4];

  return (
    <span className={`cloud-container ${className}`}>
      <span className="cloud-bar">
        {cloudsCircle.map((cloudNumber) => {
          return (
            <span
              className={`cloud cloud-circle-${cloudNumber}`}
              key={cloudNumber}
            ></span>
          );
        })}
      </span>
    </span>
  );
}
