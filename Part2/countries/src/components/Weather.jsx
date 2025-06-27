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
      <div>
        <h2>Weather in {cityName}</h2>
        <p>Temperature: {(weather.main.temp - 273.15).toFixed(2)}°C</p>        
        <img src={iconUrl}  alt={weather.weather[0].description}/>
        <p>Wind speed: {weather.wind.speed} m/s</p>
      </div>
    )
  }
  return(
    <p>can't fin weather data </p>
  )
}

export default Weather