import React, { useEffect, useState } from 'react';

const WeatherPage = ({setShowSidebar, currentWeather, showSidebar}) => {
  const currentUTC = new Date().getTime();
  const offsetMilliseconds = currentWeather.timezone * 1000;
  const currentTimeMilliseconds = currentUTC + offsetMilliseconds - 10800000;
  const time = new Date(currentTimeMilliseconds).toLocaleString();
  const [currentTime, setCurrentTime] = useState(time);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentUTC = new Date().getTime();
      const offsetMilliseconds = currentWeather.timezone * 1000;
      const currentTimeMilliseconds = currentUTC + offsetMilliseconds - 10800000;
      const newTime = new Date(currentTimeMilliseconds).toLocaleString();
      setCurrentTime(newTime);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [currentWeather.timezone]);

  var iconurl = `http://openweathermap.org/img/w/${currentWeather.weather[0].icon}.png`;

  return (
    <div className="weather-page" onMouseOver={() => setShowSidebar(false)}>
      <h1 className='app-name'>Weather<span className='by'> by Jawad</span></h1>
      <div className={showSidebar ? 'info-2' : 'info-1'}>
        <div className="temp">{currentWeather.main.temp}°C</div>
        <div className="place-time">
          <div className="location">{currentWeather.name},<span>{currentWeather.sys.country}</span></div>
          <div className="date">{currentTime}</div>
        </div>
        <div className="weather">
          <div className="symbol">
            <img src={iconurl}/>
          </div>
          <div className="weather-type">{currentWeather.weather[0].description}</div>
        </div>
      </div>
    </div>
  );
};

export default WeatherPage;