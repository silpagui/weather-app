import React from "react";
import "./SearchButton.styles.css";

export function SearchButton(props) {
  return (
    <button className="search-button" onClick={props.onClick}>
      Search for places
    </button>
  );
}
