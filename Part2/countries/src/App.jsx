import { useState, useEffect } from "react"
import axios from "axios"

import CoutriesList from "./components/CountriesList";
import './App.css'

function App() {
  const [countries, setCountries] = useState([]);
  const [searchParam, setSearchParam] = useState('')
  
  useEffect(() => {
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {        
        setCountries(response.data)        
      })
  },[])

  const matchedCountries = countries.filter(country =>
    country.name.common.toLowerCase().includes(searchParam.toLocaleLowerCase())
  )

  return(
    <main>
      <div className="search-countainer">
        <label htmlFor='search-input'>Find Countries: </label>
        <input 
          id='search-input' 
          value={searchParam}
          onChange={(event) => setSearchParam(event.target.value)}
        />
      </div>

      <CoutriesList countries={matchedCountries} show={setSearchParam}/>
    </main>
  )
}

export default App
