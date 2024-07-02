const apiKey = "{Enter OpenWeather API key}";
const weatherForm = document.querySelector(".weather-form")
const cityInput = document.querySelector(".cityInput");
const weatherCard = document.querySelector(".weather-card")

weatherForm.addEventListener("submit",  async event => {
    event.preventDefault();
    clearWeatherCard();
    
    const city = cityInput.value;

    console.log(city);

    if (city){
         const data = await getWeatherInfo(city);
         //console.log(data.weather[0].main);
         displayWeather(data);
    }else{
        displayError("Please enter a city!");
    }

})

async function getWeatherInfo(city){

    try{
        //fetching data based on city
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
        const response = await fetch (apiUrl);
        if (!response.ok){
            displayError("City does not exist!");
        }

        const data = await response.json();
        console.log(data);

        return data;

    }catch (e){
        console.log(e);
    }
    


}

function displayWeather(data){
    const cityLabel = document.createElement("p");
    const degreeLabel = document.createElement("p");
    const humidityLabel = document.createElement("p");
    const weatherStatus = document.createElement("p");
    const weatherIcon = document.createElement("p");

    const cityName = data.name;
    const degree = Math.floor(((data.main.temp - 273.15) * (9/5)) + 32);
    const humidityLevel = data.main.humidity;
    const weatherCondition = data.weather[0].main;

    cityLabel.textContent = cityName;
    degreeLabel.textContent = `${degree}°F`;
    humidityLabel.textContent = `Humidity:${humidityLevel}`;
    weatherStatus.textContent = weatherCondition;
    weatherIcon.textContent = getWeatherLogo(data.weather[0].id);

    cityLabel.classList.add("city-name");
    degreeLabel.classList.add("city-degree");
    humidityLabel.classList.add("city-humidity");
    weatherStatus.classList.add("city-weather");
    weatherIcon.classList.add("weather-logo");

    weatherCard.style.display = "block";
    weatherCard.appendChild(cityLabel);
    weatherCard.appendChild(degreeLabel);
    weatherCard.appendChild(humidityLabel);
    weatherCard.appendChild(weatherStatus);
    weatherCard.appendChild(weatherIcon);

}

function getWeatherLogo(weatherID){
        if (weatherID < 300 && weatherID >=200){
            return "⛈️";
        }else if (weatherID >= 300 && weatherID < 500){
            return "🌦️";
        }else if (weatherID >=500 && weatherID < 600){
            return "🌧️"
        }else if (weatherID >= 600 && weatherID <700){
            return "🌨️"
        }else if (weatherID === 701){
            return "🌫️";
        }else if (weatherID === 721){
            return"😶‍🌫️";
        }else if (weatherID === 800){
            return "☀️"
        }else{
            return "☁️"
        }
}

function displayError(message){
    const errorMessage = document.createElement("p");
    errorMessage.textContent = message;
    errorMessage.classList.add("error-message")

    weatherCard.textContent ="";
    weatherCard.style.display ="block";
    weatherCard.appendChild(errorMessage);
}


// This function reset the weather card
function clearWeatherCard(){
    while(weatherCard.firstChild){
        weatherCard.removeChild(weatherCard.firstChild);
    }
}