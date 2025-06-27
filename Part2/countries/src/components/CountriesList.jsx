import CountryInfo from "./CountryInfo"

const CoutriesList = ({countries, show}) => {
    
  if (countries.length > 10) {
    return(
      <div className="message-container">
        <p>too many results</p>
      </div>      
    )
  }

  if (countries.length > 1) {
    return(
      <div className="countries-list-container">
        <ul>
          {countries.map(country => 
            <li key={country.name.common}>
              <h3>- {country.name.common} </h3>
              <button onClick={() => show(country.name.common)}>
                show
              </button>
            </li>)
          }
        </ul>
      </div>        
    )
  }

  if (countries.length === 1){
    return(
      <CountryInfo country={countries[0]}/>
    )
  }
  
  return(
    <div className="message-container">
      <p>not results</p>
    </div>    
  )
}

export default CoutriesList