//Data
import { getCityTime, getCityDate} from './api.js';

//Elements
const input = document.getElementById("input");
const form = document.getElementById("form");
const button = document.getElementById("button");
const loading = document.getElementById("loading");

const weather = (user) => {
    //Weather Stuff
    document.getElementById("city").textContent = user.city.name + ", " + user.city.country;
    document.getElementById("temp").textContent = `${((user.list[0].main.temp - 273.15) * 1.8 + 32).toFixed(1)}°`;
    const weatherIcon = user.list[0].weather[0].icon;
    document.getElementById("wIcon").src = `assets/${weatherIcon}.png`;
    document.getElementById("desc").textContent = user.list[0].weather[0].main;
    document.getElementById("min/max").textContent = `${((user.list[0].main.temp_min - 273.15) * 1.8 + 32).toFixed(1)}° | ${((user.list[0].main.temp_max -273.15) * 1.8 + 32).toFixed(1)}°`;
    document.getElementById("fl").textContent = "Feels Like: " + `${((user.list[0].main.feels_like -273.15) * 1.8 + 32).toFixed(1)}°`;
    document.getElementById("ws").textContent = "Wind Speeds: " + user.list[0].wind.speed + " mph";
    document.getElementById("hum").textContent = "Humidity: " + user.list[0].main.humidity + "%";

    //Time Stuff
    document.getElementById("city2").textContent = user.city.name + ", " + user.city.country;
    const time2 = getCityTime(user.list[0].dt, user.city.timezone);
    document.getElementById("time").textContent = time2;

    const date2 = getCityDate(user.list[0].dt, user.city.timezone);
    document.getElementById("date").textContent = date2;

    const sunrise = getCityTime(user.city.sunrise, user.city.timezone);
    const sunset = getCityTime(user.city.sunset, user.city.timezone);
    document.getElementById("sun").textContent = "Sunrise: " + sunrise + " | Sunset: " + sunset;

    //5 Day Forecast
    const day1 =  getCityDate(user.list[0].dt, user.city.timezone);
    document.getElementById("d1").textContent = day1;
    const day2 =  getCityDate(user.list[6].dt, user.city.timezone);
    document.getElementById("d2").textContent = day2;
    const day3 =  getCityDate(user.list[14].dt, user.city.timezone);
    document.getElementById("d3").textContent = day3;
    const day4 =  getCityDate(user.list[22].dt, user.city.timezone);
    document.getElementById("d4").textContent = day4;
    const day5 =  getCityDate(user.list[30].dt, user.city.timezone);
    document.getElementById("d5").textContent = day5;

    const img1 = user.list[0].weather[0].icon;
    document.getElementById("img1").src = `assets/${img1}.png`;
    const img2 = user.list[6].weather[0].icon;
    document.getElementById("img2").src = `assets/${img2}.png`;
    const img3 = user.list[14].weather[0].icon;
    document.getElementById("img3").src = `assets/${img3}.png`;
    const img4 = user.list[22].weather[0].icon;
    document.getElementById("img4").src = `assets/${img4}.png`;
    const img5 = user.list[30].weather[0].icon;
    document.getElementById("img5").src = `assets/${img5}.png`;

    document.getElementById("s1").textContent = user.list[0].weather[0].main;
    document.getElementById("s2").textContent = user.list[6].weather[0].main;
    document.getElementById("s3").textContent = user.list[14].weather[0].main;
    document.getElementById("s4").textContent = user.list[22].weather[0].main;
    document.getElementById("s5").textContent = user.list[30].weather[0].main;

    document.getElementById("temp1").textContent = `${((user.list[0].main.temp_min - 273.15) * 1.8 + 32).toFixed(1)}° | ${((user.list[0].main.temp_max -273.15) * 1.8 + 32).toFixed(1)}°`;
    document.getElementById("temp2").textContent = `${((user.list[6].main.temp_min - 273.15) * 1.8 + 32).toFixed(1)}° | ${((user.list[0].main.temp_max -273.15) * 1.8 + 32).toFixed(1)}°`;
    document.getElementById("temp3").textContent = `${((user.list[14].main.temp_min - 273.15) * 1.8 + 32).toFixed(1)}° | ${((user.list[0].main.temp_max -273.15) * 1.8 + 32).toFixed(1)}°`;
    document.getElementById("temp4").textContent = `${((user.list[22].main.temp_min - 273.15) * 1.8 + 32).toFixed(1)}° | ${((user.list[0].main.temp_max -273.15) * 1.8 + 32).toFixed(1)}°`;
    document.getElementById("temp5").textContent = `${((user.list[30].main.temp_min - 273.15) * 1.8 + 32).toFixed(1)}° | ${((user.list[0].main.temp_max -273.15) * 1.8 + 32).toFixed(1)}°`;
}
//Functions

async function getCity1(event) {

    event.preventDefault();

    const iCity = input.value.trim().toLowerCase();

    const response = await fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${iCity}&appid=bedf7e4daf9c1767ed280a96c05ef68f`);

    
    if(response.ok)
    {
        loading.textContent = "Content Loaded!"
        loading.classList.add("loading")
        const user = await response.json();
        weather(user);
    }

    else
    {
        loading.textContent = "This Area Does Not Exist......"
        loading.classList.add("notFound");
    }
}

async function getCity2() {


    const response = await fetch(`http://api.openweathermap.org/data/2.5/forecast?q=stockton&appid=bedf7e4daf9c1767ed280a96c05ef68f`);

    const user = await response.json();

    weather(user);
    
}
//Listeners
button.addEventListener("click", getCity1);

button.addEventListener("click", async function() {
    input.value = "";
    button.disabled = true;
})

input.addEventListener("input", function() {
    button.disabled = input.value === "";
});

//On Load

getCity2();
