import React from 'react'
import Country from './Country'

const Content = ({countries, setCountries}) => {
  console.log('countries:', countries)
  // If too many countries, show too many matches message
  if (countries.length > 10) {
      return (
        <p>
          Too many matches, specify another filter
        </p>
      )
  } else if ((countries.length > 2 && countries.length < 10) || countries.length === 0) {
      return (
        <ul>
          {/* Display all the countries and a show more button */}
          {countries.map((country, i) =>
            <li key={i}> 
            {country.name} 
            <button onClick= {() => setCountries([country])}>
              show
            </button>
            </li>
          )}
        </ul>
      )
  } else {
      return (
        // Display country details
        <Country country={countries[0]}/>
      )
  }
}

export default Content