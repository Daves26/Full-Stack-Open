import axios from 'axios'

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/'
const allCountries = 'api/all'

const getAll = () => {
    const request = axios.get(baseUrl+allCountries)
    return request.then(response => response.data)
}

export default {getAll}