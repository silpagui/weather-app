import React from "react";
import "./HighlightsNavigation.styles.css";
import NavigationSRC from "../../assets/images/Navigation.png";

export function HighlightsNavigation({ windDirection, windDirectionDegrees }) {
  return (
    <div className="description ">
      <img
        src={NavigationSRC}
        className="navigation"
        alt="navigation-icon"
        style={{
          transform: `rotate(135deg) rotate(${windDirectionDegrees}deg)`,
        }}
      />
      <p>{windDirection}</p>
    </div>
  );
}
