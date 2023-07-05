import './App.css';
import Sidebar from './Sidebar'
import WeatherPage from './WeatherPage';
import {useState} from 'react'
import axios from 'axios';
import { useEffect } from 'react';
import {FaSearch} from "react-icons/fa"

const style = {  
  color: "rgb(255, 255, 255)",
  fontSize: '35px',
}

function App() {
  const [showSidebar, setShowSidebar] = useState(false)
  const [text,setText] = useState('')
  const [city, setCity] = useState('Sydney')
  const [recentSearches,setRecentSearches] = useState(['Beirut','California', 'Omaha'])
  const [unit,setUnit] = useState('metric')
  const [currentWeather, setCurrentWeather] = useState(
    {
      "coord":{"lon":151.2073,"lat":-33.8679},
      "weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10d"}],
      "base":"stations",
      "main":{"temp":10.73,"feels_like":9.84,"temp_min":8.64,"temp_max":12.06,"pressure":1018,"humidity":76},
      "visibility":10000,
      "wind":{"speed":4.63,"deg":300},
      "rain":{"1h":0.17},
      "clouds":{"all":75},
      "dt":1687902753,
      "sys":{"type":2,"id":2002865,"country":"AU","sunrise":1687899652,"sunset":1687935327},
      "timezone":36000,
      "id":2147714,
      "name":"Sydney",
      "cod":200
  }
  )

  useEffect(() => {
    const lowercaseDescription = currentWeather.weather[0].description.toLowerCase();

    if (lowercaseDescription.includes('rain') && !lowercaseDescription.includes('thunderstorm') ) {
      document.body.className = 'rainy';
    } else if (lowercaseDescription.includes('thunderstorm')) {
      document.body.className = 'thunderstorm';
    } else if (lowercaseDescription.includes('cloud')) {
      document.body.className = 'cloudy';
    }
      else if (lowercaseDescription.includes('snow')) {
      document.body.className = 'snow';
    }
      else if (lowercaseDescription.includes('clear')) {
      document.body.className = 'clear';
    }
      else if (lowercaseDescription.includes('haze') || lowercaseDescription.includes('fog') || lowercaseDescription.includes('mist') ) {
      document.body.className = 'haze';
    }
  
  }, [currentWeather]);

  const handleSearch = (event) => {
    setText(event.target.value)
  }

  const handleSubmit = (e) => {
    setCity(text)
    let newRecentSearches = recentSearches
    newRecentSearches.unshift(text)
    if (newRecentSearches.length > 3) newRecentSearches.pop()
    setRecentSearches(newRecentSearches)
    e.preventDefault()
    setText('')
  }

  useEffect(() => {
    async function fetchData () {
      try {
        const {data} = await axios(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=e2e5f03b89b9aaf31a6608ce047075d8`)
        console.log(data)
        if (data) setCurrentWeather(data)
      }
      catch (error) {
        console.log(error)
        alert('Please choose a valid city/country')
      }
    }
    fetchData()
  }, [city,unit])

  useEffect(() => {
    console.log(currentWeather)
  },[currentWeather])

  const handleUnits = (event) => {
    if (unit === 'metric') setUnit('imperial')
    else setUnit('metric')
  }

  useEffect(() => {
    console.log(unit)
  }, [unit])

  return (
    <div>
      <div className="search visible" onMouseOver={() => setShowSidebar(true)}>
          <div className="logo"><FaSearch style={style} /></div>
      </div>
      <WeatherPage setShowSidebar={setShowSidebar} currentWeather={currentWeather} showSidebar={showSidebar} handleUnits={handleUnits} unit={unit}/>
      <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} setCity={setCity} handleSearch={handleSearch} handleSubmit={handleSubmit} text={text} currentWeather={currentWeather} recentSearches={recentSearches}/>  
    </div>
  )
}

export default App;
