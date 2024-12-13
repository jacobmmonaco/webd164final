// Ensure the DOM is fully loaded before executing any script
$(document).ready(function () {
  // Tomorrow.io API key for fetching weather data
  const apiKey = "LSLZgMD788poFqJax9C8lAKW87XJ1E9R";

  // Event listener for the "Get Weather" button click
  $("#getWeatherBtn").on("click", function () {
    // Get the city name entered by the user
    let city = $("#cityInput").val().trim();

    if (city) {
      // If a city name is entered, fetch weather data for that city
      getWeather(city);

      // Store the last searched city in local storage
      localStorage.setItem("lastCity", city);
    } else {
      // Alert the user if no city name is entered
      alert("Please enter a city name.");
    }
  });

  /**
   * Fetches real-time weather data for the given city using Tomorrow.io API
   * @param {string} city - The name of the city to fetch weather data from
   */
  function getWeather(city) {
    // Construct the API URL with the city name and API key
    const url = `https://api.tomorrow.io/v4/weather/realtime?location=${city}&apikey=${apiKey}`;

    // Make a fetch request to the Tomorrow.io API
    fetch(url)
      .then((response) => {
        // Check if the response is successful
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => displayWeather(data)) // Call the display function with the fetched data
      .catch((err) => {
        // Handle any errors that occur during the fetch request
        console.error(err);
        $("#weatherInfo").html(
          "Error fetching weather data. Please try again."
        );
      });
  }

  /**
   * Displays the weather data on the webpage
   * @param {Object} data - The weather data returned from the API
   */
  function displayWeather(data) {
    // Gather weather data from the API response
    const weather = data.data.values;

    // Create the HTML to display the weather information
    let weatherHTML = `
          <h2>Weather in ${$("#cityInput").val()}</h2>
          <p>Temperature: ${weather.temperature} °C</p>
          <p>Humidity: ${weather.humidity}%</p>
          <p>Cloud Cover: ${weather.cloudCover}%</p>
        `;

    // Update the weather info section with the generated HTML
    $("#weatherInfo").html(weatherHTML);
  }

  // On page load, check if there's a last searched city in local storage
  let lastCity = localStorage.getItem("lastCity");
  if (lastCity) {
    // Populate the input with the last searched city and fetch its weather data
    $("#cityInput").val(lastCity);
    getWeather(lastCity);
  }
});
