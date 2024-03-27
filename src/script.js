import './style.css';

import * as dayImg from './assets/night.jpg';

let city = 'santo stefano di magra';
const AUTH_KEY = 'f852f0db70844505a91155804242103';


let inputCityDOM = document.querySelector('#city');
let conditionIconDOM = document.querySelector('.condition-icon>img');
let conditionTextDOM = document.querySelector('.condition-text>#currentConditionText');
let currentTempDOM = document.querySelector('.condition-text>#temp');
let hourlyInfoDOM = document.querySelectorAll('.hourlyInfo');

//backgrounds
let currentDOM = document.querySelector('.current');
let todayDOM = document.querySelector('.today');


async function getWeatherLocation(location) {
    const response = await fetch(`https://api.weatherapi.com/v1/search.json?key=${AUTH_KEY}&q=${location}`, { mode: 'cors' });
    const locationInfo = await response.json();

    inputCityDOM.setAttribute('placeholder', locationInfo[0].name);
    return getWeatherInfo(locationInfo[0].name);
}

async function getWeatherInfo(location) {
    const weather = await fetch(`https://api.weatherapi.com/v1/forecast.json?q=${location}&days=3&key=${AUTH_KEY}`, { mode: 'cors' })
    const weatherInfo = await weather.json();
    console.log(weatherInfo);
    return weatherInfo;
}

let weather = await getWeatherLocation(city).catch(error => {
    console.error(error);
    alert('Something went wrong...');
});

let currentWeather = weather.current;
displayCurrentWeather();

let forecastday = weather.forecast.forecastday;

displayHourlyWeather(forecastday);


let astro = forecastday[0].astro;

console.log(weather, forecastday, currentWeather.condition);




function displayCurrentWeather(){

    conditionIconDOM.setAttribute('src', `https:${currentWeather.condition.icon}`);
    conditionTextDOM.textContent = `${currentWeather.condition.text}`;
    currentTempDOM.textContent = `${currentWeather.temp_c}°C`;
}
// async function getHourForecast(ind){
//     const forecast=await getWeatherLocation(city).catch(error => {
//         console.error(error);
//         alert('Something went wrong...');
//     });
    
//     let forecastHour=forecast.forecastday[0].hour[ind];
//     return forecastHour
// }
function displayHourlyWeather(forecastdays){
    let now = parseInt(weather.location.localtime.slice(-5, -3));
    let j=0;
    for (let i = 0; i < hourlyInfoDOM.length; i++) {
        //this is the hour displayed
        if(now+i < 24){
            hourlyInfoDOM[i].children[0].textContent = `${forecastdays[0].hour[now+i].time.slice(-5)}`;
            hourlyInfoDOM[i].children[1].children[0].src = `https:${forecastdays[0].hour[now+i].condition.icon}`;
            hourlyInfoDOM[i].children[2].textContent =`${forecastdays[0].hour[now+i].temp_c}°C`;
        }else{
            hourlyInfoDOM[i].children[0].textContent = `${forecastdays[1].hour[j].time.slice(-5)}`;
            hourlyInfoDOM[i].children[1].children[0].src = `https:${forecastdays[1].hour[j].condition.icon}`;

            hourlyInfoDOM[i].children[2].textContent =`${forecastdays[1].hour[j].temp_c}°C`;

            j++;
        }
        
    }
    // let hours = [];
    // let todayHour=forecastHoursToday;

    // for (let i = 0; forecastHoursToday.length; i++) {
    //     console.log();
    //     if (todayHour[i].time.slice(-5, -3) >= now) {
    //         hours.push(forecastHoursToday[i])
    //     }
    //     console.log(hours);
    // };
    // for (let j = 0; forecastHoursTomorrow.length; j++) {
    //     hours.push(forecastHoursTomorrow[j]);
    //     console.log(hours);
    // }
    
   
}

currentDOM.style.backgroundImage = `url(${dayImg.default})`;


todayDOM.style.backgroundColor = '#111931'
// #111931 #142b3b















// <a href="https://www.freepik.com/free-vector/hand-drawn-flat-winter-solstice-background_20757292.htm#fromView=search&page=1&position=5&uuid=07975cbd-9301-4032-a8bb-1a850bb982e7">Image by freepik</a>

// <a href="https://www.freepik.com/free-vector/meadow-with-pond-conifer



// https://api.weatherapi.com/v1/forecast.json?q=London&days=3&dt=2024-03-27&hour=1&alerts=yes&aqi=yes&key=f852f0db70844505a91155804242103

// https://app.swaggerhub.com/apis-docs/WeatherAPI.com/WeatherAPI/1.0.2#/APIs/forecast-weather