import React from "react";

// Display the weather details
const WeatherDisplay = ({ weather }) => {
    if (weather) {
        return (
            <div>
                <>
                    <p>
                        <b>temperature:</b> {Math.round(weather.main.temp - 273.15)} celsius
                    </p>
                    <p>
                        <b>Current Weather:</b> {weather.weather[0].description}
                    </p>
                    <img
                        src={weather.weather[0].icon}
                        alt={weather.weather[0].main}
                        width="50px"
                        height="50px"
                    />
                    <p>
                        <b>wind:</b> {weather.wind.speed} mph direction {weather.wind_dir}
                    </p>
                </>
            </div>
        );
    }
    else
        return (<div><p>No weather data available</p></div>);
};

export default WeatherDisplay;
