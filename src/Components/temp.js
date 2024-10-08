import React, {useEffect, useState} from 'react'
import "./style.css"
import WeatherCard from './weatherCard';
const Temp = () => {
  const [searchValue, setSearchValue] = useState("Bhopal");
  const [tempInfo, setTempInfo] = useState({});

  const getWeatherInfo = async () =>{
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=10aacc1e1487c13fd5abc6b787d6ee98`;
      let res = await fetch(url);
      let data = await res.json();
      // console.log(data);
      const {temp, humidity, pressure} = data.main;
      const {main:weathermood} = data.weather[0];
      const {name} = data;
      const {speed} = data.wind;
      const {country, sunset} = data.sys;
      const myNewWeatherInfo = {
        temp,
        humidity,
        pressure,
        weathermood,
        name, speed,
        country, sunset,
      }
      setTempInfo(myNewWeatherInfo);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    getWeatherInfo();
  }, [])
  return (
    <>
    <div className="wrap">
        <div className="search">
            <input type="search" placeholder='search...' autoFocus id="search" className="searchTerm" value={searchValue} onChange={(e)=>{setSearchValue(e.target.value)}}/>
            <button className="searchButton" type="search" onClick={getWeatherInfo}>
              Search
            </button>
        </div>
    </div>
    {/* Our temp card */}
    <WeatherCard tempInfo={tempInfo}/>
    </>
  )
}

export default Temp;
