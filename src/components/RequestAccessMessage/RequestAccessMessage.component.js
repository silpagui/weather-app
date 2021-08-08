import React from "react";

export function RequestAccessMessage() {
  return (
    <div className="proxy-message">
      <h2>Server access required</h2>
      <ol>
        <li>
          Please go{" "}
          <a
            href="https://cors-anywhere.herokuapp.com/"
            rel="noreferrer"
            target="_blank"
          >
            here
          </a>{" "}
          and click on request temporary access button.
        </li>
        <li>Then go back to this page and refresh it.</li>
      </ol>
      <p>
        Those steps are required because I am using a free proxy server that
        helps me to solve the CORS issues with the weather API.{" "}
        <strong>Thanks for your patience.</strong>
      </p>
    </div>
  );
}
