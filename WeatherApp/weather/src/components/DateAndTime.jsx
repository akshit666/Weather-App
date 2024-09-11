import React from "react";
import "../style/Style.css"
export default function DateAndTime({ weatherData }) {
  const getFormattedDate = () => {
    const currentDate = new Date();
    return currentDate.toDateString();
  };

  return (
    <div className="time">
      <h2>{getFormattedDate()}</h2>
    </div>
  );
}

