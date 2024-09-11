import React from "react";
import feelsLikeLogo from "../assets/FeelsLike.png";
import "../style/Style.css";

export default function LatLonDetails({ weatherData, toggleUnit, unit }) {
  // const tempMin = weatherData ? weatherData.main.temp_min : null;
  // const tempMax = weatherData ? weatherData.main.temp_max : null;

  return (
    <div className="lat-lon-container">
      <div className="temp-details">
        {/* <p className="inner">
          <img src={feelsLikeLogo} alt="Minimum Temperature" />
          {`Min Temperature: ${tempMin ? (unit === "metric" ? (tempMin - 273.15).toFixed(1) : (tempMin - 273.15) * 9/5 + 32).toFixed(1) : 'N/A'} ${unit === "metric" ? '°C' : '°F'}`}
        </p>
        <p className="inner">
          <img src={feelsLikeLogo} alt="Maximum Temperature" />
          {`Max Temperature: ${tempMax ? (unit === "metric" ? (tempMax - 273.15).toFixed(1) : (tempMax - 273.15) * 9/5 + 32).toFixed(1) : 'N/A'} ${unit === "metric" ? '°C' : '°F'}`}
        </p> */}
      </div>
      <button className="unit-toggle-button" onClick={toggleUnit}>
        Switch to {unit === "metric" ? "Fahrenheit" : "Celsius"}
      </button>
    </div>
  );
}
