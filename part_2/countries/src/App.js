import React, { useState, useEffect } from "react";
import config from "./config";
import axios from "axios";
import CountriesDisplay from "./components/CountriesDisplay";

const App = () => {
  // Initialize state func for all the countries
  const [countries, setCountries] = useState([]);
  // Initialize state func for filtered the countries
  const [filteredCountries, setFilteredCountries] = useState([]);
  // Initialize state func for the filter
  const [filter, setFilter] = useState("");
  // Initialize state func for the weather
  const [weather, setWeather] = useState();

  // Fetch the countries from the server using Axios and set the countries array to the data
  useEffect(() => {
    console.log("countries effect");
    axios.get("https://restcountries.com/v2/all").then((res) => {
      if (res.status === 200) {
        setCountries(res.data);
      }
    });
  }, []);

  // Fetch the weather from the server using Axios and set the weather array to the data
  useEffect(() => {
    console.log("filter effect")
    const filtered = countries.filter((country) =>
      country.name.toLowerCase().includes(filter)
    );
    setFilteredCountries(filtered)
    // Only fetch the country if there is a filter and there is a list of countries
  }, [filter, countries]);
  // Fetch the weather from the server using Axios and set the weather array to the data
  useEffect(() => {
    if (filteredCountries.length === 1) {
      console.log("weather effect")
      const location = filteredCountries[0].capital;
      let apikey = config.api_key.substring(1, config.api_key.length - 2)
      const url = ` https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apikey}`;
      axios.get(url).then((res) => {
        if (res.status === 200) {
          setWeather(res.data);
        }
      });
    }
  // Only fetch the weather if there is a filtered countries
  }, [filteredCountries]);

  return (
    <div className="App">
      <div>
        find countries{" "}
        <input
          value={filter}
          // Convert it to lower case for the filter
          onChange={(event) => setFilter(event.target.value.toLowerCase())}
        />
      </div>


      <CountriesDisplay
      // If there is a filter, set the filtered countries to the filtered countries, else set it to an empty array
        filteredCountries={filter === "" ? [] : filteredCountries}
        setFilteredCountries={setFilteredCountries}
        weather={weather}
      />
    </div>
  );
};

export default App;