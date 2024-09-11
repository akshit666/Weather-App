import React from "react";
import sunriseImg from "../assets/sunrise1.png";
import sunsetImg from "../assets/sunset 1.png";
import humidityy from "../assets/Humidity.png";
import "../style/Style.css";
const convertTimestampToTime = (timestamp) => {
  // This function converts a timestamp (UNIX time) to a human-readable time in the "HH:MM" format
  const date = new Date(timestamp * 1000);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

export default function SunriseSunset({ weatherData }) {
  // This component receives weather data (props) and displays sunrise, sunset, and humidity information
  
  if (!weatherData) return null; 

  const sunrise = convertTimestampToTime(weatherData.sys.sunrise);
  const sunset = convertTimestampToTime(weatherData.sys.sunset);
  const humidity = weatherData.main.humidity;

  return (
    <div className="more-info">
      <div className="sunrise-small">
        <img src={sunriseImg} alt="sunrise img" />
        <p className="more-info-para">
          <span>Sunrise:</span>
          <br />
          <span>{sunrise}</span>
        </p>
      </div>

      <div className="sunset-small">
        <img src={sunsetImg} alt="sunset img" />
        <p className="more-info-para">
          <span>Sunset:</span>
          <br />
          <span>{sunset}</span>
        </p>
      </div>

      <div className="humidity">
        <img className="humidityimg" src={humidityy} alt="humidity img" />
        <p className="more-info-para">
          <span>Humidity:</span>
          <br />
          <span>{humidity}%</span> 
        </p>
      </div>
    </div>
  );
}
