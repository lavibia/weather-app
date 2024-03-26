import './style.css';
console.log('im here');
let city;
const AUTH_KEY = 'f852f0db70844505a91155804242103';

async function getWeatherInfo(){
    const response= await fetch(`https://api.weatherapi.com/v1/search.json?key=${AUTH_KEY}&q=rom`, { mode: 'cors' });
    const locationInfo= await response.json();
    console.log(locationInfo);

    const weather = await fetch(`https://api.weatherapi.com/v1/forecast.json?q=${locationInfo[0].name}&days=3&key=${AUTH_KEY}`, { mode: 'cors' })
    const weatherInfo = await weather.json();
    console.log(weatherInfo);
    return weatherInfo;
}
let weather= await getWeatherInfo();
let currentWeather = weather.current;
let forecast = weather.forecast;
console.log(weather, forecast, currentWeather.condition);


// let consitionDOM =document.getElementById('try-content');

// let img=document.createElement('img');
// img.setAttribute('src',`https:${currentWeather.condition.icon}`);

// consitionDOM.textContent=currentWeather.condition.text;
// consitionDOM.appendChild(img);

// https://api.weatherapi.com/v1/forecast.json?q=London&days=3&dt=2024-03-27&hour=1&alerts=yes&aqi=yes&key=f852f0db70844505a91155804242103

// https://app.swaggerhub.com/apis-docs/WeatherAPI.com/WeatherAPI/1.0.2#/APIs/forecast-weather