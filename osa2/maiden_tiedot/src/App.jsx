import { useState, useEffect, useRef } from 'react'
import countryService from './services/countries'

const SearchForm = ({ onSubmit, onChange, newQuery }) => {
  return (
    <form onSubmit={onSubmit}>
      <label htmlFor='query'>find countries </label>
      <input 
        id='query'
        value={newQuery}
        onChange={onChange}
        placeholder='..' />
    </form>
  )
}

const ShowButton = ({ onSubmit, inputRef, name }) => {
  return (
    <form onSubmit={onSubmit}>
      <button type='submit' onClick={() => inputRef.current = name}>Show</button>
    </form>
  )
}

const InfoDisplay = ({ countries, weather, inputRef, onSubmit, update }) => {

  if (countries.length > 10) {
    return (
      <div>
        Too many matches, specify another filter
      </div>
    )
  }
  else if (countries.length === 1) {
    const country = countries[0]
    const languages = Object.values(country.languages)
    var capital = ''
    
    try {
      capital = country.capital[0]
    }
    catch {
      capital = 'None'
    }

    if (weather) {
      const iconCode = weather.current.weather[0].icon
      const iconSrc = `https://openweathermap.org/img/wn/${iconCode}@2x.png`
      return (
        <div>
          <h2>{country.name.common}</h2>
          capital {capital} <br></br>
          area {country.area}
          <h3>languages:</h3>
          <ul>
            {languages.map(lang =>
              <li key={lang}>
                {lang}
              </li>
            )}
          </ul>
          <img src={country.flags.svg} alt={country.flags.alt} height='250'></img>
          <h2>Weather in {capital}</h2><br></br>
          temperature {weather.current.temp} Celsius <br></br>
          <img src={iconSrc} height='100'></img> <br></br>
          wind {weather.current.wind_speed} m/s
        </div>
      )
    }
  }

  return (
    <div>
      <ul>
        {countries.map(country =>
          <li key={country.name.common}>
            {country.name.common}
            <ShowButton onSubmit={onSubmit} inputRef={inputRef} name={country.name.common} />
          </li>
        )}
      </ul>
    </div> 
  )
}

const WeatherDisplay = ({ update, weather, countries }) => {
  if (countries.length === 1) {
    update()
  }
  if (weather) {
    const temp = weather.current.temp
    return (
    <div>
      temperature {temp}
    </div>
  )
  }
}

const caseInsensitiveInclude = (search, str) =>
  new RegExp(str, 'i').test(search)

const App = () => {
  const [query, setQuery] = useState('') 
  const [value, setValue] = useState(null)
  const [countries, setCountries] = useState([])
  const [previousCountry, setPreviousCountry] = useState('')
  const [weatherCoords, setWeatherCoords] = useState(null)
  const [weather, setWeather] = useState(null)
  const inputRef = useRef(null)

  useEffect(() => {
    if (value) {
      countryService
        .getCountries(value)
        .then(responseData => {
          const countriesByQuery = responseData.filter(country => caseInsensitiveInclude(country.name.common, value))
            console.log(countriesByQuery)
            setCountries(countriesByQuery)
          }
        )
    }
  }, [value])

  useEffect(() => {
    if (weatherCoords) {
      countryService
        .getWeather(weatherCoords.lat, weatherCoords.lon)
        .then(responseData => {
          setWeather(responseData)
        })
    }
  }, [weatherCoords])

  const handleChange = (event) => {
    setValue(event.target.value)
    setQuery(event.target.value)
    
    // keep track of previous country so no excessive calls are made to the weather api

    if (countries.length === 1 && previousCountry != countries[0].name.common) {
      updateWeatherInfo()
      setPreviousCountry(countries[0].name.common)
    }
  }

  const onSearch = (event) => {
    event.preventDefault()
    setValue(query)
    setQuery('')
  }

  const onShowButtonClick = (event) => {
    event.preventDefault()
    setValue(inputRef.current)

    updateWeatherInfo()
    setPreviousCountry(countries[0].name.common)
  }

  const updateWeatherInfo = () => {
    const country = countries[0]
    setWeatherCoords({lat: country.capitalInfo.latlng[0], lon: country.capitalInfo.latlng[1]})
  }

  return (
    <div>
      <SearchForm 
        onSubmit={onSearch} 
        onChange={handleChange}
        newQuery={query} />
      <InfoDisplay 
        countries={countries} 
        weather={weather} 
        inputRef={inputRef} 
        onSubmit={onShowButtonClick} 
        update={updateWeatherInfo} />
    </div>
  )
}

export default App