import './style.css';

import * as dayImg from './assets/day.jpg';

console.log('im here');
let city ='rom';
const AUTH_KEY = 'f852f0db70844505a91155804242103';
let currentDOM= document.querySelector('.current');
currentDOM.style.backgroundImage=`url(${dayImg.default})`;



async function getWeatherInfo(){
    const response= await fetch(`https://api.weatherapi.com/v1/search.json?key=${AUTH_KEY}&q=${city}`, { mode: 'cors' });
    const locationInfo= await response.json();
    console.log(locationInfo);

    const weather = await fetch(`https://api.weatherapi.com/v1/forecast.json?q=${locationInfo[0].name}&days=3&key=${AUTH_KEY}`, { mode: 'cors' })
    const weatherInfo = await weather.json();
    console.log(weatherInfo);
    return weatherInfo;
}
city='rome';
let weather= await getWeatherInfo();
let currentWeather = weather.current;
let forecast = weather.forecast;
console.log(weather, forecast, currentWeather.condition);




let conditionIconDOM =document.querySelector('.condition-icon>img');
conditionIconDOM.setAttribute('src',`https:${currentWeather.condition.icon}`);

let conditionTextDOM=document.querySelector('.condition-text>#currentConditionText');

conditionTextDOM.textContent=`${currentWeather.condition.text}`

let currentTempDOM=document.querySelector('.condition-text>#temp');
currentTempDOM.textContent=`${currentWeather.temp_c}°C`

// <a href="https://www.freepik.com/free-vector/hand-drawn-flat-winter-solstice-background_20757292.htm#fromView=search&page=1&position=5&uuid=07975cbd-9301-4032-a8bb-1a850bb982e7">Image by freepik</a>

// <a href="https://www.freepik.com/free-vector/meadow-with-pond-conifer



// https://api.weatherapi.com/v1/forecast.json?q=London&days=3&dt=2024-03-27&hour=1&alerts=yes&aqi=yes&key=f852f0db70844505a91155804242103

// https://app.swaggerhub.com/apis-docs/WeatherAPI.com/WeatherAPI/1.0.2#/APIs/forecast-weather