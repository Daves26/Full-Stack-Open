import { useState } from "react"
import countriesService from './services/countries'
import { useEffect } from "react"
import Countries from "./components/Countries"

function App() {
  const [search, setSearch] = useState('')
  const [countriesData, setCountriesData] = useState([])

  useEffect(() => {
    countriesService.getAll().then(response => {
      console.log(response)
      setCountriesData(response)
    }).catch(error => {
      console.error('Error fetching data:', error)
    })
  }, [])

  const handleSearch = (event) => {
    event.preventDefault()
    setSearch(event.target.value)
  }

  return (
    <div>
      <form>
        find countries
        <input autoFocus autoComplete="off" value={search} onChange={handleSearch}></input>
      </form>
      <div>
        <Countries countriesToDisplay={countriesData}/>
      </div>
    </div>
  )
}

export default App
