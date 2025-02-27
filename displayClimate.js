//To fetch details and display when the whole html page is loaded
document.addEventListener('DOMContentLoaded', function() {
    //declaring API key
    const apiKey = '180e47893225400cb5d122543252502'; 
    //adding event listener to the button
    document.getElementById('getWeather').addEventListener('click', function() {
        const place = document.getElementById('location-inp').value;
        if (place) {
            fetchWeather(place);
        }
    });
    //asynchronous function to simulate non-blocking execution of fetching details
    async function fetchWeather(place) {
        try {
            const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${place}&aqi=yes`);
            const data = await response.json();
            if (data.error) {
                alert('Cannot find location!, try again later');
            } else {
                displayInfo(data);
            }
        } catch (er) {
            console.error(er);
            alert('Error fetching data');
        }
    }
    //function to dispaly details
    function displayInfo(data) {
        document.getElementById('weather-info').style.display = 'block';
        document.getElementById('city').textContent = `${data.location.name}, ${data.location.country}`;
        document.getElementById('temperature').textContent = `Temperature: ${data.current.temp_c}°C`;
        document.getElementById('description').textContent = `${data.current.condition.text}`;
        document.getElementById('humidity').textContent = `Humidity: ${data.current.humidity}%`;
        document.getElementById('pressure').textContent = `Pressure: ${data.current.pressure_mb} hPa`;
        document.getElementById('precipitation').textContent = `Chances of precipitation: ${data.current.precip_mm} mm`;
        document.getElementById('wind-speed').textContent = `Windspeed: ${data.current.wind_kph} km/h`;
        // Prediction Air Quality Index's nature
        if (data.current.air_quality) {
            const AQI = data.current.air_quality['us-epa-index'];
            let text = '';
            if (AQI == 1) text = 'Good';
            if (AQI == 2) text = 'Fair';
            if (AQI == 3) text = 'Moderate';
            if (AQI == 4) text = 'Poor';
            if (AQI == 5) text = 'Very Poor';
            document.getElementById('aqi').textContent = `Air quality index: ${text}`;
        } else {
            document.getElementById('aqi').textContent = 'Air Quality: Not Available';
        }
    }
});