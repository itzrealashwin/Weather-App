const parallax_el = document.querySelectorAll(".parallax");

let xValue = 0, yValue = 0;
window.addEventListener("mousemove", (e)=>{
    xValue = e.clientX - window.innerWidth/2;
    yValue = e.clientY - window.innerHeight/2;;

    parallax_el.forEach(el => {
        let speedx = el.dataset.speedx;
        let speedy = el.dataset.speedy;
        el.style.transform = `translateX(calc(-50% + ${xValue * speedx}px)) translateY(calc(-50%  + ${yValue * speedy}px))`;
    });
});


let searchBtn = document.querySelector(".search button");
let searchBox = document.querySelector(".search input");
const apiKey = "54b7e91cf65a305c937485e6a13e63ea"
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const weatherIcon = document.querySelector(".weather-icon");


async function checkWeather(city) {
    // const searchBox = document.querySelector(".search input");
    // let searchBtn = document.querySelector(".search button");
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    let inputValue = searchBox.value;
    searchBox.value = "";

    if(response.status == 404 || inputValue === ""){
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }else{
        var data = await response.json();

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = data.main.temp + "°c";
        document.querySelector(".humidity").innerHTML = data.main.humidity +"%";
        document.querySelector(".wind").innerHTML = data.wind.speed + "km\h";

        if(data.weather[0].main == "Clouds"){
            weatherIcon.src = "clouds.png"; 
        }else if(data.weather[0].main == "Clear"){
            weatherIcon.src = "clear.png";
        }else if(data.weather[0].main == "Rain"){
            weatherIcon.src = "rain.png";
        }else if(data.weather[0].main == "Drizzle"){
            weatherIcon.src = "drizzle.png";
        }else if(data.weather[0].main == "Mist"){
            weatherIcon.src = "mist.png";
        }
        
        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }
}

searchBtn.addEventListener("click", ()=>{
    checkWeather(searchBox.value);
})

function key(event){
    if(event.keyCode == 13){
        checkWeather(searchBox.value);
    }
}