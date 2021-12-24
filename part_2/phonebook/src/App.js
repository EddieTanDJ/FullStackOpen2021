import React, {useState, useEffect} from 'react'
import './App.css'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import axios from 'axios'                                                                                    

const App = () => {
  const [persons, setPersons] = useState([]) 
  // For the name and phone input
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  // For the filter input
  const [newFilter, setNewFilter] = useState('')

  // Ex 2.11 Using the axios library to fetch data from an API
  useEffect(() => {
    console.log('effect')
    axios.get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      }
    )
  }, [])

  //Ex 2.6, 2.8 Add a new person
  const addPerson = (event) => {
    event.preventDefault()
    console.log('addPerson:', {newName}, {newNumber})
    const newPerson = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }
    //Ex 2.7: Send a alert message if the name exists in the array 
    if (persons.find(person => person.name === newPerson.name)) {
      console.log('Person exists:' , newPerson.name, newPerson.number)
      alert(`${newPerson.name} is already added to phonebook`)
      setNewName('')
      setNewNumber('')
    } else {
      setPersons(persons.concat(newPerson))
      setNewName('')
      setNewNumber('')
  }
}


  //Handle name input change
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  // Handle number input change
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  // Handle filter input change
  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  // Filter the persons array
  const personsToShow = persons.filter(person =>
    person.name.toLowerCase().includes(newFilter.toLowerCase())
  )

  return (
    <div className='App'>
      <h1>Phonebook</h1>
      <Filter value={newFilter} onChange={handleFilterChange} />
      <h2>Add a new</h2>
      <PersonForm onSubmit={addPerson} newName={newName} handleNameChange = {handleNameChange}
      newNumber = {newNumber} handleNumberChange = {handleNumberChange} />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} />
    </div>
  )
}

export default App