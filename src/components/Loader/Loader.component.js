import React from "react";
import { Cloud } from "../Cloud/Cloud.component";
import { Sun } from "../Sun/Sun.component";

import "./Loader.styles.css";

export function Loader() {
  return (
    <span className="loader-container">
      <Cloud className="cloud-1" />
      <Sun />
      <Cloud />
    </span>
  );
}
