import React from "react";
import "../style/Style.css";

export default function WelcomeMessage({ message }) {
  const now = new Date();
  const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
  const date = now.toLocaleDateString(undefined, options);
  const time = now.toLocaleTimeString();

  return (
    <div className="Welcome">
      <p>{message}</p> {/* Display dynamic message */}
      <p className="welcome-Date-Time">{` ${date}`}</p>
      <p className="welcome-Date-Time">{` ${time}`}</p>
    </div>
  );
}
