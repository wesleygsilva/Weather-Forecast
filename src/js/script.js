const btnMobile = document.querySelector('#btn-mobile');

const menuControl = () => {
    const nav = document.querySelector('nav');
    
    if (nav.offsetLeft < 0) {
        nav.classList.remove('hide-menu');
        nav.classList.add('show-menu');
    } else {
        nav.classList.remove('show-menu');
        nav.classList.add('hide-menu');
    }
}

btnMobile.addEventListener('click', menuControl);

const API_KEY = '8deb1b52';

const inputState = document.querySelector('[data-js="state"]');
const inputCity = document.querySelector('[data-js="input-city"]');
const consult = document.querySelector('[data-js="consult"]');

const mainIcon = document.querySelector('[data-js="widget-main-icon"]');
const temperature = document.querySelector('[data-js="widget-main-temperature"]');
const humidity = document.querySelector('[data-js="humidity"]');
const windSpeed = document.querySelector('[data-js="wind-speed"]');

const city = document.querySelector('[data-js="city"]');
const dateHour = document.querySelector('[data-js="date-hour"]');
const weatherDescription = document.querySelector('[data-js="weather-description"]');

const getUrl = (cityStateName = '') => {
    if (cityStateName === '') {
        return `https://api.hgbrasil.com/weather?format=json-cors&array_limit=8&fields=only_results&key=${API_KEY}&user_ip=remote`; 
    } else {
        return `https://api.hgbrasil.com/weather?format=json-cors&array_limit=8&fields=only_results&key=${API_KEY}&city_name=${cityStateName}`; 
    }
}

const fetchWeatherForecast = async (url) => {
    try {
        const response = await fetch(url);
        const weatherForecastData = await response.json();

        if (weatherForecastData.results === '') { 
            throw new Error('Falha ao se comunicar com a API');
        }

        return weatherForecastData;
    } catch (err) {
        alert(err)
    }
}

const getHour = () => {
    const date = new Date();
    const hour = date.getHours(); 

    return hour;
}

const setIconForecast = (description, hour) => ({
    'Tempestade forte' : "../src/images/thunder cloud.svg", 
    'Tempestade tropical': (hour >= 18 && hour < 6) ? "../src/images/night raining cloud.svg" : "../src/images/sun cloudly raining.svg",
    'Furacão': "../src/images/wind.svg",
    'Tempestades severas' : "../src/images/thunder cloud.svg", 
    'Tempestades' : "../src/images/thunder cloud.svg", 
    'Misto de neve e chuva' : "../src/images/snowing.svg", 
    'Misto chuva e gelo' : "../src/images/snowing.svg", 
    'Misto neve e gelo' : "../src/images/snowing.svg", 
    'Geada fina' : "../src/images/foggy cloud.svg",
    'Chuviscos' : (hour >= 18 && hour < 6) ? "../src/images/night raining cloud.svg" : "../src/images/sun cloudly raining.svg",
    'Congelamento chuva' : "../src/images/snowing.svg",  
    'Alguns chuviscos' : (hour >= 18 && hour < 6) ? "../src/images/night raining cloud.svg" : "../src/images/sun cloudly raining.svg",
    'Alguns chuviscos' : (hour >= 18 && hour < 6) ? "../src/images/night raining cloud.svg" : "../src/images/sun cloudly raining.svg",
    'Neve baixa' : "../src/images/snow.svg",
    'Tempestade com neve' : "../src/images/snow.svg",
    'Ventania com neve' : "../src/images/wind.svg",
    'Neve' : "../src/images/snow.svg",
    'Granizo' : "../src/images/snowing.svg", 
    'Gelo' : "../src/images/snow.svg",
    'Poeira' : "../src/images/wind.svg",
    'Neblina'  : "../src/images/foggy cloud.svg",
    'Tempestade de areia' : "../src/images/wind.svg",
    'Fumacento' : "../src/images/foggy.svg", 
    'Vento acentuado' : "../src/images/wind.svg",
    'Ventania' : "../src/images/wind.svg",
    'Tempo frio':  "../src/images/snow cloudly.svg", 
    'Tempo nublado' : "../src/images/cloud.svg", 
    'Tempo limpo' : (hour >= 18 && hour < 6) ? "../src/images/moon.svg" : "../src/images/sunny.svg",
    'Tempo nublado' : "../src/images/cloud.svg", 
    'Parcialmente nublado' : (hour >= 18 && hour < 6) ? "../src/images/moon cloud.svg" : "../src/images/sunny cloud.svg",
    'Parcialmente nublado' : (hour >= 18 && hour < 6) ? "../src/images/moon cloud.svg" : "../src/images/sunny cloud.svg",
    'Tempo limpo' : (hour >= 18 && hour < 6) ? "../src/images/moon.svg" : "../src/images/sunny.svg",
    'Ensolarado' : (hour >= 18 && hour < 6) ? "../src/images/moon.svg" : "../src/images/sunny.svg",
    'Estrelado' : (hour >= 18 && hour < 6) ? "../src/images/moon.svg" : "../src/images/sunny.svg",
    'Ensolarado com muitas nuvens' : (hour >= 18 && hour < 6) ? "../src/images/moon cloud.svg" : "../src/images/sunny cloud.svg",
    'Misto chuva e granizo' : "../src/images/snowing.svg",  
    'Ar quente' : (hour >= 18 && hour < 6) ? "../src/images/moon.svg" : "../src/images/sunny.svg",
    'Tempestades isoladas' : "../src/images/thunder cloud.svg", 
    'Trovoadas dispersas' : "../src/images/thunder.svg",
    'Trovoadas dispersas' : "../src/images/thunder.svg",
    'Chuvas esparsas' : (hour >= 18 && hour < 6) ? "../src/images/night raining cloud.svg" : "../src/images/sun cloudly raining.svg",
    'Pesados neve' : "../src/images/snow.svg",
    'Chuviscos com neve' : "../src/images/rain cloud.svg", 
    'Neve pesada' : "../src/images/snow.svg",
    'Sol com poucas nuvens' : (hour >= 18 && hour < 6) ? "../src/images/moon cloud.svg" : "../src/images/sunny cloud.svg",
    'Chuva' : "../src/images/rain cloud.svg", 
    'Queda de neve' : "../src/images/snow.svg",
    'Tempestades isoladas' : "../src/images/thunder cloud.svg"
})[description] || 'Não foi possivel obter as informações'; 

const showMainWeatherForecast = (internalWeatherForecastData) => {
    mainIcon.setAttribute('src', setIconForecast(internalWeatherForecastData.description, getHour()));
    temperature.innerHTML = internalWeatherForecastData.temp;
    humidity.innerHTML = internalWeatherForecastData.humidity;
    windSpeed.innerHTML = internalWeatherForecastData.wind_speedy;

    const stateCityNew = internalWeatherForecastData.city
    city.innerHTML = stateCityNew.replace(",", " -");
    dateHour.innerHTML = `${internalWeatherForecastData.date} - ${internalWeatherForecastData.time}`;
    weatherDescription.innerHTML = internalWeatherForecastData.description;
}

const removeCardDay = () => {
    const divMain = document.querySelector('.weather-widged-days');   
    
    divMain.innerText = '';
}

const addNewCardDay = (item) => {
    const divMain = document.querySelector('.weather-widged-days'); 
    const newDiv = document.createElement('div');
    const src = setIconForecast(item.description, getHour());

    const newCard = `<div class="weather-widged-days-item">
                         <p>${item.weekday}</p>
                         <img class="weather-widged-days-img" src="${src}" >
                         <div class="weather-widged-min-max">
                             <p class="weather-widged-min">${item.min}°</p>
                             <p class="weather-widged-max">${item.max}°</p>
                         </div>
                     </div>`;

    divMain.appendChild(newDiv);
    newDiv.innerHTML = newCard;
}

const showDaysWeatherForecast = (forecastData) => {
    forecastData.forEach(item => {
        removeCardDay();
    });

    forecastData.forEach(item => {
        addNewCardDay(item);
    });
}

const getWeatherForecast = async () => {
    const stateCity = `${inputCity.value},${inputState.value}`;
    const internalWeatherForecastData = await fetchWeatherForecast(getUrl(stateCity));

    showMainWeatherForecast(internalWeatherForecastData);
    showDaysWeatherForecast(internalWeatherForecastData.forecast);
    menuControl();
}

consult.addEventListener('click', getWeatherForecast);

const init = async () => {
    const internalWeatherForecastData = await fetchWeatherForecast(getUrl());

    showMainWeatherForecast(internalWeatherForecastData);
    showDaysWeatherForecast(internalWeatherForecastData.forecast);
}

init();




