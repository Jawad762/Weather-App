import { WiStrongWind, WiCloud, WiHumidity, WiRaindrop } from "react-icons/wi";
const style = {
    position: 'relative',
    top: '17%'
}

const Sidebar = ({showSidebar, setShowSidebar,handleSearch, handleSubmit, text, currentWeather, setCity, recentSearches}) => {
    return (
        <div className={showSidebar ? 'sidebar' : 'hidden'}>
            <div className="sidebar-1">
                <form onSubmit={(event) => handleSubmit(event)}>
                <input type="input" className="form__field" placeholder="Choose a location" value={text} onChange={(event) => handleSearch(event)}/>
                </form>
            </div>
            <div className="sidebar-2">
                {recentSearches.map(city => {
                    return (
                        <h2 className="countries" onClick={(event) => setCity(event.target.innerText)}>{city}</h2>
                    )
                })}
            </div>
            <h1 className="weather-details-header">Weather Details</h1>
            <div className="sidebar-3">
                <div className="row">
                    <h2>Clouds <WiCloud style={style}/></h2>
                    <h2>{currentWeather.clouds.all}%</h2>
                </div>
                <div className="row">
                    <h2>Humidity <WiHumidity style={style}/></h2>
                    <h2>{currentWeather.main.humidity}%</h2>
                </div>
                <div className="row">
                    <h2>Wind <WiStrongWind style={style}/></h2>
                    <h2>{currentWeather.wind.speed} m/s</h2>
                </div>
                <div className="row">
                    <h2>Rain <WiRaindrop style={style}/></h2>
                    <h2>{currentWeather.rain && currentWeather.rain["1h"] ? `${currentWeather.rain["1h"]} mm` : '0 mm'}</h2>
                </div>
            </div>
        </div>
    )
}

export default Sidebar