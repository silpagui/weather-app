import React from "react";

export function TooManyRequestsMessage() {
  return (
    <div className="proxy-message">
      <h2>Too many request</h2>
      <p>
        Because I am using a free proxy server this page has a rate limit,
        please refresh the page and <strong>try again in a few minutes</strong>.
      </p>
    </div>
  );
}
