import CountryInfo from "./CountryInfo"

const CoutriesList = ({countries, show}) => {
    
  if (countries.length > 10) {
    return(
      <p>too many results</p>
    )
  }

  if (countries.length > 1) {
    return(
      <div>
        <ul>
          {countries.map(country => 
            <li key={country.name.common}>
              {country.name.common} 
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
    <p>not results</p>
  )
}

export default CoutriesList