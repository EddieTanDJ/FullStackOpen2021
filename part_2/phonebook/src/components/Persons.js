import React from "react"

const Person = ({person, deletePerson }) => (
    <li>
        {person.name} {person.number}
        {' '}
        <button onClick={() => deletePerson(person.id, person.name)}>Delete</button>
    </li>
  );


const Persons = ({persons, filter, deletePerson}) => {
    console.log('Persons:', persons)
    console.log('filter:', filter)
    return persons
    .filter((person) => person.name.toLowerCase().includes(filter))
    .map((person) => {
      return (
        <div>
            <ul>
            <Person key={person.name} person={person} deletePerson={deletePerson} />
            </ul>
        </div>
      );
    });
};

export default Persons