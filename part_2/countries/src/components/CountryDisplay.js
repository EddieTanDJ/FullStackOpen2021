import React from "react";
import WeatherDisplay from "./WeatherDisplay";

// Display the country details
const CountryDisplay = ({ country, weather }) => {
    return (
        <div>
            <h1>{country.name}</h1>
            <p>capital {country.capital}</p>
            <p>population {country.population}</p>
            <h3>Languages</h3>
            <ul>
                {country.languages.map((language) => (
                    <li key={language.name}>{language.name}</li>
                ))}
            </ul>
            <img
                src={country.flag}
                width="100px"
                height="100px"
                alt={`flag of ${country.name}`}
            />
            <h3>Weather in {country.capital}</h3>
            <WeatherDisplay weather={weather} />
        </div>
    );
};

export default CountryDisplay;