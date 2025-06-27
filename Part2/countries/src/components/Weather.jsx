import { useState, useEffect } from "react"
import axios from "axios"

const Weather = ({cityName}) => {
  const [weather, setWeather] = useState(null)

  const key = import.meta.env.VITE_API_KEY;
  const urlIcon = "https://openweathermap.org/img/wn/";

  useEffect(() => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${key}`)
      .then(response => {
        setWeather(response.data)
      })
  }, [])
  
  if(weather !== null){    
    const iconUrl = urlIcon + weather.weather[0].icon + ".png";
    return(
      <div className="weather-container">
        <h2>Weather in {cityName}</h2>
        <div className="weather-info">
          <img src={iconUrl}  alt={weather.weather[0].description}/>
          <p><b>Temperature:</b> {(weather.main.temp - 273.15).toFixed(2)}°C</p>  
          <p><b>Wind speed:</b> {weather.wind.speed} m/s</p>
        </div>        
      </div>
    )
  }
  return(
    <div className="message-container">
      <p>loading... </p>
    </div>    
  )
}

export default Weather