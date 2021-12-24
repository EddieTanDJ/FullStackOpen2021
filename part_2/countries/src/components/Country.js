import React, { useState, useEffect } from 'react'

const Country = ({country}) => {
    console.log('country.name:', country.name)
    console.log('country.capital:', country.capital)
    console.log('country.population:', country.population)
    console.log('country.languages:', country.languages)
    console.log('country.flag:', country.flag)
    
  return (
    <div>
      <h1>{country.name}</h1>
      <p>capital: {country.capital}</p>
      <p>population: {country.population}</p>
      <h2>Spoken languages</h2>
      <ul>
          {/* Display all the spoken languages */   }
          {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
      </ul>
      <img src={country.flag} alt="Country flag"></img>
    </div>
  )
}

export default Country