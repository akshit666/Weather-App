import React from "react";
import feelsLikeLogo from "../assets/hot.png";
import Pressure from "../assets/PressureBg.png";
import Windicon from "../assets/wind.svg";
import "../style/Style.css";

export default function WeatherDetails({ weatherData, unit, toggleUnit }) {
  const temperature =
    unit === "metric"
      ? weatherData.main.temp
      : Math.round((weatherData.main.temp * 9) / 5 + 32);
  const feelsLike =
    unit === "metric"
      ? weatherData.main.feels_like
      : Math.round((weatherData.main.feels_like * 9) / 5 + 32);
  const minTemp =
    unit === "metric"
      ? Math.round(weatherData.main.temp_min)
      : Math.round((weatherData.main.temp_min * 9) / 5 + 32);

  const maxTemp =
    unit === "metric"
      ? Math.round(weatherData.main.temp_max)
      : Math.round((weatherData.main.temp_max * 9) / 5 + 32);

  const Wind = weatherData.wind.speed;
  const pressure = weatherData.main.pressure;

  return (
    <div className="weather-details">
      <div className="Temp-Wind">
        <p className="Temp">{`${temperature}°${
          unit === "metric" ? "C" : "F"
        }`}</p>
        <div className="windspeed">
          <img src={Windicon} alt="Wind Speed Icon" />
          <p className="Wind">{`Wind Speed: ${Wind} km/h`}</p>
        </div>
      </div>
      <hr />
      <div className="Details">
        <div className="pressure-feelsLike">
          <div className="inner">
            <div className="feelslike">
              <img src={feelsLikeLogo} alt="Feels Like" />
            </div>
            <div className="feelslikeData">
              <p className="DetailsParaHeading">Feels Like</p>
              <p className="DetailsParaValue">{`${feelsLike}°${
                unit === "metric" ? "C" : "F"
              }`}</p>
            </div>
          </div>
          <div className="inner">
            <div className="pressure">
              <img src={Pressure} alt="Pressure" />
            </div>
            <div className="pressureData">
              <p className="DetailsParaHeading">Pressure</p>
              <p className="DetailsParaValue">{`${pressure} hPa`}</p>
            </div>
          </div>
        </div>
        <div className="lng-lat">
          <div className="inner">
            <div className="minTemp">
              <img src={feelsLikeLogo} alt="Min Temp" />
            </div>
            <div className="minTempData">
              <p className="DetailsParaHeading">Min Temp</p>
              <p className="DetailsParaValue">{` ${minTemp}°${
                unit === "metric" ? "C" : "F"
              }`}</p>
            </div>
          </div>
          <div className="inner">
            <div className="maxTemp">
              <img src={feelsLikeLogo} alt="Max Temp" />
            </div>
            <div className="maxTempData">
              <p className="DetailsParaHeading">Max Temp</p>
              <p className="DetailsParaValue">{`${maxTemp}°${
                unit === "metric" ? "C" : "F"
              }`}</p>
            </div>
          </div>
        </div>
      </div>
      <button className="unit-toggle-button" onClick={toggleUnit}>
        Switch to {unit === "metric" ? "Fahrenheit" : "Celsius"}
      </button>
    </div>
  );
}
