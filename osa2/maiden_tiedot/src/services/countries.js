import axios from 'axios'
const countriesUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'
const api_key = import.meta.env.VITE_SECRET_KEY

const getCountries = query => {
    const request = axios.get(countriesUrl)
    return request.then(response => response.data)
}

const getWeather = (lat, lon) => {
    console.log(`${lat} ${lon}`)
    const api_request = axios.get(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=minutely,hourly,daily,alerts&appid=${api_key}`)
    return api_request.then(response => response.data)
}

export default { getCountries, getWeather }