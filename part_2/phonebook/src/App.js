import React, { useState, useEffect } from "react";
import personService from "./services/persons";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [errorMessage, setErrorMessage] = useState({
    message: null,
    type: "error",
  });

  // Get all the contacts from the server
  useEffect(() => {
    personService.getAll().then((res) => {
      setPersons(res.data);
    });
  }, []);

  // Delete a new contact from the server
  /*
  A convention has also developed regarding the use of _, 
  which is frequently used to preface the name of an object's
  property or method that is private. 
  */
  const deletePerson = (id, name) => {
    // Prompt the user to confirm the deletion
    console.log("deletePerson", id, name);
    if (window.confirm(`Delete ${name} ?`)) {
      personService
        .deleteEntry(id)
        .then((_) => {
          // The _ is a placeholder for the returned value of the promise
          // The returned value of the promise is the deleted person
          // Removing the deleted person from the application's state is done with the array filter method.
          setPersons(persons.filter((person) => person.id !== id));
          setErrorMessage({
            message: `Successfully deleted ${name}`,
            type: "success",
          });
          setTimeout(() => {
            setErrorMessage({
              message: null
            });
          }, 3000);
        })
        .catch((_) => {
          setErrorMessage({
            message: `The person ${name} was already deleted from server`,
            type: "error",
          });
          setTimeout(() => {
            setErrorMessage({ message: null, type: "error" });
          }, 3000);
          // Remove the person from the state with array filter method
          setPersons(persons.filter((person) => person.id !== id));
        });
    }
  };
  // Add a new contact to the server
  const addPersons = (event) => {
    // Prevent the default action of the form
    event.preventDefault();
    const name = newName;
    const number = newNumber;
    // Create a new person object with the new name and number
    const personObj = { name, number };
    // If name is empty, alert the user
    if (name === "" || name === undefined) {
      window.alert("Please input a valid name!");
    }
    // If name is not empty, check if the name already exists in the server 
    else if (persons.map((person) => person.name).includes(name)) {
      // Get the person object from the server
      const person = persons.find((person) => person.name.includes(name));
      // Prompt the user to confirm the update of the number if number does not match
      if (person.number !== number) {
        if (
          window.confirm(
            `${name} is already added to phonebook, replace old number with a new one?`
          )
        ) {
          // Update the number of the person object
          personService
            .update(person.id, personObj)
            .then((_) => {
              // Update the person object in the application's state
              // map method creates a new array by mapping every item from the old array into an item 
              // in the new array
              // In this case, the new array is created conditionally so that if person.id === id is true, 
              // we return the updated person object, otherwise we return the original person object.
              const copy = persons.map((p) =>
                p.id === person.id ? personObj : p
              );
              setPersons(copy);
            })
            .then((_) => {
              // After the update is done, get all the persons object from the server
              personService.getAll().then((res) => {
                setPersons(res.data);
              })
            })
            .catch((_) => {
              setErrorMessage({
                message: `The person ${name} was already deleted from server`,
                type: "error",
              });
              setTimeout(() => {
                setErrorMessage({ message: null, type: "error" });
              }, 3000);
              // Remove the person from the state with array filter method
              setPersons(persons.filter((person) => person.name !== name));
            });
        }
      } 
      // If name is not empty and does not exist in the server, add the person object to the server
    } else {
      // Reset values
      setNewName("");
      setNewNumber("");
      personService.create(personObj)
        .then((res) => {
          console.log(res);
          // Add new person to persons state
          setPersons([...persons, personObj]);
          setErrorMessage({ message: `Added ${personObj.name}`, type: "success" });
          setTimeout(() => {
            setErrorMessage(null);
          }, 3000)
        })
        .catch((error) => {
          setErrorMessage({
            message: `${error.response.data.error}`,
            type: "error",
          })
        })
        .then((_) => {
          // After the add person is done, get all the persons object from the server
          personService.getAll().then((res) => {
            setPersons(res.data);
          })
        })
        .catch((error) => {
          setErrorMessage({
            message: `${error.response.data.error}`,
            type: "error",
          })
        })
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification error={errorMessage} />
      <Filter value={filter} setValue={setFilter} />
      <h2>add a new</h2>
      <PersonForm
        onSubmit={addPersons}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} deletePerson={deletePerson} />
    </div>
  );
};

export default App;