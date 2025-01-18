
const apiKey = 'caf214091f94d844b92332bbc8e855d7';

// Function to fetch weather data
async function fetchWeatherData(city) {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
        );
        if (!response.ok) {
            throw new Error("Unable to fetch weather data");
        }
        const data = await response.json();
        updateWeatherUI(data);
        scrollToHighlights(); 
    } catch (error) {
        console.error(error);
    }
}

// Function to update the weather highlights section
function updateWeatherUI(data) {
    const highlights = document.querySelector("#highlights .highlights-container");
    const humidityElement = highlights.querySelector(".highlight-card:nth-child(1) h3 span");
    const temperatureElement = highlights.querySelector(".highlight-card:nth-child(2) h3 span");
    const windSpeedElement = highlights.querySelector(".highlight-card:nth-child(3) h3 span");

    // Update the values
    humidityElement.textContent = `${data.main.humidity}%`;
    temperatureElement.textContent = `${Math.round(data.main.temp)}°C`;
    windSpeedElement.textContent = `${data.wind.speed} km/h`;
}

// Function to scroll to the weather highlights section
function scrollToHighlights() {
    const highlightsSection = document.querySelector("#highlights");
    highlightsSection.scrollIntoView({ behavior: "smooth" }); 
}

// Function to handle Enter key press and fetch weather data
function handleEnterKeyPress(event) {
    if (event.key === "Enter") {
        event.preventDefault(); 
        const city = event.target.value.trim();
        if (city !== "") {
            fetchWeatherData(city);
            event.target.value = ""; 
        }
    }
}

// Add event listener for Enter key press on the input element
const inputElement = document.querySelector("#city-search");
inputElement.addEventListener("keypress", handleEnterKeyPress);

// Add event listener to the form for the "Get Weather" button
const formElement = document.querySelector(".search-form");
formElement.addEventListener("submit", function (e) {
    e.preventDefault();
    const city = inputElement.value.trim();
    if (city !== "") {
        fetchWeatherData(city);
        inputElement.value = ""; 
    }
});