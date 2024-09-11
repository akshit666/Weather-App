import React from "react";
import rainLogo from "../assets/RainLogo.svg";
import cloudyLogo from "../assets/Cloudy.png";
import lightningLogo from "../assets/Lightning.svg";
import sunnyLogo from "../assets/SunnyLogo.png";
import hazeLogo from "../assets/haze.png";
import mistLogo from "../assets/MistLogo.png";
import "../style/Style.css";

export default function WeatherLogo({ weather }) {
  // This function component receives the 'weather' prop to determine which logo and text to display

  return (
    <div className="upper-detail">
      {/* Check if the weather is "rain", and display the rain logo and text if true */}
      {weather === "rain" && (
        <div className="logo">
          <img src={rainLogo} alt="Rain Logo" className="weather-logo" />
          <div className="weather-info">
            <h1>Rain</h1>
          </div>
        </div>
      )}

      {/* For Cloudy weather*/}
      {weather === "cloudy" && (
        <div className="logo">
          <img src={cloudyLogo} alt="Cloudy Logo" className="weather-logo" />
          <div className="weather-info">
            <h1>Cloudy</h1>
          </div>
        </div>
      )}

      {/*For Sunny weather */}
      {weather === "sunny" && (
        <div className="logo">
          <img src={sunnyLogo} alt="Sunny Logo" className="weather-logo" />
          <div className="weather-info">
            <h1>Sunny</h1>
          </div>
        </div>
      )}

      {/* For thunderstorm */}
      {weather === "thunderstorm" && (
        <div className="logo">
          <img
            src={lightningLogo}
            alt="Thunderstorm Logo"
            className="weather-logo"
          />
          <div className="weather-info">
            <h1>Thunderstorm</h1>
          </div>
        </div>
      )}

      {/* For haze weather*/}
      {weather === "haze" && (
        <div className="logo">
          <img src={hazeLogo} alt="Haze Logo" className="weather-logo" />
          <div className="weather-info">
            <h1>Haze</h1>
          </div>
        </div>
      )}

      {/* For mist weather */}
      {weather === "mist" && (
        <div className="logo">
          <img src={mistLogo} alt="Mist Logo" className="weather-logo" />
          <div className="weather-info">
            <h1>Mist</h1>
          </div>
        </div>
      )}
    </div>
  );
}
