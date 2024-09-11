import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import WeatherLogo from "./WeatherLogo";
import WeatherDetails from "./WeatherDetails";
import SunriseSunset from "./SunriseSunset";
import WelcomeMessage from "./WelcomeMessage";
import "../style/Style.css";

export default function WeatherCard() {
  const [weather, setWeather] = useState("");
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [unit, setUnit] = useState("metric");
  const [error, setError] = useState(null);
  const [location, setLocation] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [recentSearches, setRecentSearches] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [locationAccessDenied, setLocationAccessDenied] = useState(false); // New state for location access
  const weatherApiKey = "904d5c935c447b438158509fa9fe2fd4"; // Replace with your OpenWeatherMap API Key

  // Fetch weather data function
  const fetchWeatherData = async (query, isCoords = false) => {
    try {
      const url = isCoords
        ? `https://api.openweathermap.org/data/2.5/weather?lat=${query.lat}&lon=${query.lon}&appid=${weatherApiKey}&units=metric`
        : `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${weatherApiKey}&units=metric`;

      const response = await fetch(url);
      const data = await response.json();

      if (data.cod !== 200) {
        setError("Unable to fetch weather data.");
        setWeatherData(null);
        setWeather("");
        setLocationAccessDenied(false); // Reset location denied in case of search error
        return;
      }

      const mainWeather = data.weather[0].main.toLowerCase();
      let weatherCondition = "unknown";

      switch (mainWeather) {
        case "clear":
          weatherCondition = "sunny";
          break;
        case "clouds":
          weatherCondition = "cloudy";
          break;
        case "rain":
          weatherCondition = data.weather[0].description.includes("drizzle")
            ? "drizzle"
            : "rain";
          break;
        case "thunderstorm":
          weatherCondition = "thunderstorm";
          break;
        case "snow":
          weatherCondition = "snow";
          break;
        case "mist":
          weatherCondition = "mist";
          break;
        case "haze":
          weatherCondition = "haze";
          break;
        default:
          weatherCondition = mainWeather; // Use the exact weather name for other conditions
          break;
      }

      setWeather(weatherCondition);
      setWeatherData({
        ...data,
        main: {
          ...data.main,
          temp: Math.round(data.main.temp),
          feels_like: Math.round(data.main.feels_like),
        },
      });
      setLocation(`${data.name}, ${data.sys.country}`);
      setError(null);
      setInputValue(`${data.name}, ${data.sys.country}`);
      addRecentSearch(data.name); // Add the city to recent searches
    } catch (error) {
      setError("Error fetching data, please try again later.");
      console.error("Error fetching data:", error);
    }
  };

  // Add recent searches to local storage
  const addRecentSearch = (city) => {
    let searches = [...recentSearches];
    if (!searches.includes(city)) {
      searches.unshift(city);
      if (searches.length > 5) {
        searches.pop();
      }
      setRecentSearches(searches);
      localStorage.setItem("recentSearches", JSON.stringify(searches));
    }
  };

  // Load recent searches from local storage on component mount
  useEffect(() => {
    const storedSearches = JSON.parse(localStorage.getItem("recentSearches"));
    if (storedSearches) {
      setRecentSearches(storedSearches);
    }
  }, []);

  // Geolocation functionality
  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            fetchWeatherData(
              { lat: position.coords.latitude, lon: position.coords.longitude },
              true
            );
            setLocationAccessDenied(false); // Location access granted
          },
          (error) => {
            setError("Error getting location: " + error.message);
            setLocationAccessDenied(true); // Set to true when location access is denied
          }
        );
      } else {
        setError("Geolocation is not supported by this browser.");
        setLocationAccessDenied(true);
      }
    };

    getLocation();
  }, []);

  const handleSearchChange = (event) => {
    setInputValue(event.target.value);
    setCity(event.target.value);
  };

  const handleSearch = () => {
    if (!inputValue.trim()) {
      setError("Please enter a city name.");
      return;
    }
    fetchWeatherData(inputValue);
    setShowDropdown(false); // Hide dropdown after search
  };

  const handleRecentSearchClick = (city) => {
    setInputValue(city);
    fetchWeatherData(city);
    setShowDropdown(false); // Hide dropdown after clicking recent search
  };

  const toggleUnit = () => {
    setUnit((prevUnit) => (prevUnit === "metric" ? "imperial" : "metric"));
  };

  const convertTemp = (temp) => {
    return unit === "metric"
      ? Math.round(temp)
      : Math.round((temp * 9) / 5 + 32);
  };

  return (
    <>
      <div className={`Hero ${weather}`}>
        <div className="left">
          {weatherData ? (
            <WeatherLogo weather={weather} weatherData={weatherData} locationAccessDenied={locationAccessDenied} />
          ) : locationAccessDenied ? (
            <div className="upper-detail">
              <WelcomeMessage message="Welcome to Weather App" />
            </div>
          ) : (
            <div className="upper-detail">
              <WelcomeMessage message="No city found" />
            </div>
          )}
          {weatherData && <SunriseSunset weatherData={weatherData} />}
        </div>

        <div className="right">
          <SearchBar
            handleSearchChange={handleSearchChange}
            handleSearch={handleSearch}
            error={error}
            location={inputValue}
            recentSearches={recentSearches}
            showDropdown={showDropdown}
            setShowDropdown={setShowDropdown}
            handleRecentSearchClick={handleRecentSearchClick}
          />
          {weatherData && (
            <WeatherDetails
              weatherData={weatherData}
              unit={unit}
              toggleUnit={toggleUnit}
              convertTemp={convertTemp}
            />
          )}
        </div>
      </div>
    </>
  );
}
