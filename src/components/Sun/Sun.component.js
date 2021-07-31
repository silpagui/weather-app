import React from "react";
import "./Sun.styles.css";

export function Sun() {
  const sunRays = Array.from(new Array(8));

  return (
    <span className="sun-container">
      <span className="sun">
        {sunRays.map((x, sunRay) => {
          return (
            <span className={`sun-ray sun-ray-${sunRay}`} key={sunRay}></span>
          );
        })}
      </span>
    </span>
  );
}
