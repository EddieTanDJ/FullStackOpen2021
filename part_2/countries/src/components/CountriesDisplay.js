import React from "react";
import CountryDisplay from "./CountryDisplay";

const CountriesDisplay = ({
    filteredCountries,
    setFilteredCountries,
    weather,
  })  => {
    // Display the country details if result is one
    if (filteredCountries.length === 1)
      return <CountryDisplay country={filteredCountries[0]} weather={weather} />;

    // Using conditional operator if result is more than 10, return "Too many matches, specify another filter" 
    else if (filteredCountries.length > 10) 
    return <p>Too many matches, specify another filter</p>
     // else return the list of countries with button to show all the details
    else {
        return (   
            <>  
                {filteredCountries.map((country) => (
                <p key={country.name}>
                    {country.name}{" "}
                    <button onClick={() => setFilteredCountries([country])}>show</button>
                </p>
                ))}
            </>
        );
    }
  };

  export default CountriesDisplay;