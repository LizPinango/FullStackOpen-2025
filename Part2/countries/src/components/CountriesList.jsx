import CountryInfo from "./CountryInfo"

const CoutriesList = ({countries}) => {
  if (countries.length != 0) {
    if (countries.length <= 10) {
      if(countries.length === 1){
        return(
          <CountryInfo country={countries[0]}/>
        )
      }      
      return(
        <div>
          <ul>
            {countries.map(country => 
              <li key={country.ccn3}>{country.name.common}</li>)
            }
          </ul>
        </div>        
      )
    }
    return(
      <p>too many results</p>
    )
  }
  return(
    <p>not results</p>
  )
}

export default CoutriesList