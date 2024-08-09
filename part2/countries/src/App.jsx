import { useState } from "react"
import countriesService from './services/countries'
import { useEffect } from "react"
import Countries from "./components/Countries"

function App() {
  const [search, setSearch] = useState('')
  const [countryList, setCountryList] = useState([])
  const [countriesToDisplay, setCountriesToDisplay] = useState([])

  useEffect(() => {
    countriesService.getAll().then(response => {
      setCountryList(response)
    }).catch(error => {
      console.error('Error fetching data:', error)
    })
  }, [])

  const handleSearch = (event) => {
    event.preventDefault()
    setSearch(event.target.value)
  }

  useEffect(() => {
    setCountriesToDisplay(countryList.filter(country => 
      country.name.common.toLowerCase().includes(search.toLowerCase())
    ))
  }, [search])

  return (
    <div>
      <form>
        find countries
        <input autoFocus autoComplete="off" value={search} onChange={handleSearch}></input>
      </form>
      <div>
        <Countries countriesToDisplay={countriesToDisplay}/>
      </div>
    </div>
  )
}

export default App
