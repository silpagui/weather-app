import React from "react";
import "./HighlightsItem.styles.css";

export function HighlightsItem(props) {
  return (
    <div className="highlights">
      <h3 className="title-highlights">{props.title}</h3>
      <p className="data-number">{props.dataNumber}</p>
      <p className="data-unit">{props.dataUnit}</p>
      {props.decoration}
    </div>
  );
}
