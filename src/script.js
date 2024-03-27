import './style.css';
import * as dayImg from './assets/day.jpg';
import * as nightImg from './assets/night.jpg';


const AUTH_KEY = 'f852f0db70844505a91155804242103';

let inputCityDOM = document.querySelector('#city');
let searchIconDOM = document.querySelector('.search>#search');

let city = inputCityDOM.value;
inputCityDOM.value = '';

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
let forecastday = weather.forecast.forecastday;
let astro = forecastday[0].astro;
displayCurrentWeather();
displayDailyWeather(forecastday);
displayHourlyWeather(forecastday);
displayBackground(weather, astro);
displayTodayDetails(currentWeather, astro);

searchIconDOM.addEventListener('click', async () => {
    if (inputCityDOM.value !='') {
        city = inputCityDOM.value;
        weather = await getWeatherLocation(inputCityDOM.value).catch(error => {
            console.error(error);
            alert('Something went wrong...');
        });
        currentWeather = weather.current;
        forecastday = weather.forecast.forecastday;
        astro = forecastday[0].astro;
        displayCurrentWeather();
        displayDailyWeather(forecastday);
        displayHourlyWeather(forecastday);
        displayBackground(weather, astro);
        displayTodayDetails(currentWeather, astro);
        console.log(city);
        inputCityDOM.value = "";
    }

})

function displayDailyWeather(days) {
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let date;
    let day;
    let daysDOM = document.querySelectorAll('.dailyInfo');

    for (let i = 0; i < daysDOM.length; i++) {
        //set the week day using the date of the forecast
        date = new Date(days[i].date);
        day = date.getDay();
        daysDOM[i].children[0].textContent = dayNames[day];

        //image condition and min max temp
        daysDOM[i].children[1].children[0].src = `https:${days[i].day.condition.icon}`;

        daysDOM[i].children[2].textContent = `min: ${days[i].day.mintemp_c}°C`;
        daysDOM[i].children[3].textContent = `max: ${days[i].day.maxtemp_c}°C`;
    }
}
function displayBackground(locationWeather, todayAstro) {
    let currentDOM = document.querySelector('.current');
    let todayDOM = document.querySelector('.forecast');
    let sunrise = parseInt(todayAstro.sunrise.slice(0, 2));
    let sunset = parseInt(todayAstro.sunset.slice(0, 2));
    let now = parseInt(locationWeather.location.localtime.slice(-5, -3));
    if (now >= sunrise && now < (sunset + 12)) {
        currentDOM.style.backgroundImage = `url(${dayImg.default})`;
        todayDOM.style.backgroundColor = '#142b3b'
        // #111931 #142b3b
    } else {
        currentDOM.style.backgroundImage = `url(${nightImg.default})`;
        todayDOM.style.backgroundColor = '#111931'
    }

    //backgrounds



}
function displayTodayDetails(current, todayAstro) {
    document.querySelector('.humidity>h2').textContent = `${current.humidity}%`;
    document.querySelector('.wind>h2').textContent = `${current.wind_kph} km/h`;
    document.querySelector('.sunRise>h2').textContent = `${todayAstro.sunrise}`;
    document.querySelector('.sunSet>h2').textContent = `${todayAstro.sunset}`;

}
function displayCurrentWeather() {
    let conditionIconDOM = document.querySelector('.condition-icon>img');
    let conditionTextDOM = document.querySelector('.condition-text>#currentConditionText');
    let currentTempDOM = document.querySelector('.condition-text>#temp');
    conditionIconDOM.setAttribute('src', `https:${currentWeather.condition.icon}`);
    conditionTextDOM.textContent = `${currentWeather.condition.text}`;
    currentTempDOM.textContent = `${currentWeather.temp_c}°C`;
}
function displayHourlyWeather(forecastdays) {
    let hourlyInfoDOM = document.querySelectorAll('.hourlyInfo');
    let now = parseInt(weather.location.localtime.slice(-5, -3));
    let j = 0;
    for (let i = 0; i < hourlyInfoDOM.length; i++) {
        //this is the hour displayed
        if (now + i < 24) {
            hourlyInfoDOM[i].children[0].textContent = `${forecastdays[0].hour[now + i].time.slice(-5)}`;
            hourlyInfoDOM[i].children[1].children[0].src = `https:${forecastdays[0].hour[now + i].condition.icon}`;
            hourlyInfoDOM[i].children[2].textContent = `${forecastdays[0].hour[now + i].temp_c}°C`;
        } else {
            hourlyInfoDOM[i].children[0].textContent = `${forecastdays[1].hour[j].time.slice(-5)}`;
            hourlyInfoDOM[i].children[1].children[0].src = `https:${forecastdays[1].hour[j].condition.icon}`;

            hourlyInfoDOM[i].children[2].textContent = `${forecastdays[1].hour[j].temp_c}°C`;

            j++;
        }

    }

}
