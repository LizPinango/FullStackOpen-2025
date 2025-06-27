import Weather from "./Weather"

const CountryInfo = ({country}) => {  
  return(
    <div className="country-container">
      <h2>{country.name.common}</h2>
      <div className="info-card">
        <h3>Basic Data</h3>
        <p>Capital: {country.capital}</p>
        <p>Area: {country.area} km2</p>
      </div>
      <div className="info-card">
        <h3>Languages</h3>
        <ul>
          {Object.values(country.languages).map(language => 
            <li key={language}>{language}</li>
          )}
        </ul>
      </div>
      <div className="info-card">
        <h3>Flag</h3>
        <img src={country.flags.png} alt={country.flags.alt}/> 
      </div>  

      <Weather cityName={country.capital}/>
    </div>
  )
}

export default CountryInfo