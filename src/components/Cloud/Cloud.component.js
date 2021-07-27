import React from "react";
import "./Cloud.styles.css";

export function Cloud({ className }) {
  const cloudsCircle = Array.from(new Array(4));

  return (
    <span className={`cloud-container ${className}`}>
      <span className="cloud-bar">
        {cloudsCircle.map((x, index) => {
          const cloudNumber = index + 1;
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
