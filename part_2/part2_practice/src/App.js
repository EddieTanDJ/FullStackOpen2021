import React, { useState, useEffect } from "react"
import axios from "axios"
import Notes from './components/Notes'
import noteService from './services/notes'
import Notification from './components/Notification'
import Footer from './components/Footer'


const baseUrl = '/api/notes'

const App = (props) => {
  // Initialize state func with the notes array passed in the props
  const [notes, setNotes] = useState([])
  // Initialize state func with an empty string to store the new note
  const [newNote, setNewNote] = useState('')
  // Initialize state func with boolean to allow us to view the important notes
  const [showAll, setShowAll] = useState(true)
  // Initalize state func with an empty string to store the error message
  const [errorMessage, setErrorMessage] = useState(null)

  const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
  }


  // Link the hook to backend
  const hook = () => {
    console.log('effect')
    // Get the data from server
    axios.get(baseUrl)
      .then(response => {
        console.log('response', response)
        setNotes(response.data)
      })
  }

  // useEffect is a React hook that runs a piece of code based on a specific condition
  // The first argument is a function that runs when the effect is run
  // The second argument is an array of values that cause the effect to rerun
  useEffect(hook, [])

  // Trigger when there is re-rendering of the note component
  console.log('render', notes.length, 'notes')

  // Add a new note
  const addNote = (e) => {
    e.preventDefault()
    console.log('button clicked:', e.target)

    const noteObject = {
      id: notes.length + 1,
      // Create a new note object that receive the content form the input 
      content: newNote,
      // Generate a date for the note
      date: new Date().toISOString(),
      // 50% chance of being important
      important: Math.random() > 0.5,
    }
    noteService
      .create(noteObject)
      .then(returnedNote  => {
        console.log('note created', returnedNote )
        // Add the new note to the notes array
        setNotes(notes.concat(returnedNote))
        // Reset the input value by calling the setNewNote func
        setNewNote('')
      })
  }

  // Handle input change
  const handleNoteChange = (e) => {
    console.log('handleNoteChange:', e.target.value)
    setNewNote(e.target.value)
  }

  // Show only important notes
  // Use condition operator to check if showAll is true or false

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)

  const toggleImportanceOf = (id) => {
    console.log(`importance of ${id} needs to be toggled`)
    // Find the note that has the same id
    const url = `http://localhost:3001/notes/${id}`
    // Find the note we want to modify and assign it to a note variable
    const note = notes.find(n => n.id === id)
    // Create a new note object with the old note's content and the opposite important value
    // { ...note } creates a new object with copies of all the properties from the note object.
    // { ...note, important: true } creates a new object with the important property set to true.
    // In this case, important property gets the opposite (negation) value of the old important property.
    const changedNote = { ...note, important: !note.important }
    // Send a PUT request to the server with the changed note
    noteService
      .update(id, changedNote)
      .then(returnedNote  => {
        //  callback function sets the component's notes state to a new array that contains all the items from the previous notes array, 
        // except for the old note which is replaced by the updated version of it returned by the server
        // map method creates a new array by mapping every item from the old array into an item in the new array
        // In this case, the new array is created conditionally so that if note.id !== id is true, we simply copy the item from the old array into the new array.
        // If the condition is false, then the note object returned by the server is added to the array instead.
        console.log('note updated', returnedNote )
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
        .catch(error => {
          setErrorMessage(
            `Note '${note.content}' was already deleted from the server`
          )
          // Show the notification for 5 seconds
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          // Remove the note from the state with array filter method
          setNotes(notes.filter(n => n.id !== id))
        })
  }

  const deleteNote = (id) => {
    console.log(`delete note ${id}`)
    // Find the note that has the same id
    const note = notes.find(n => n.id === id)
    // Send a DELETE request to the server with the note
    noteService
      .deleteNote(id)
      .then(returnedNote  => {
        console.log('note deleted', returnedNote)
        //  callback function sets the component's notes state to a new array that contains all the items from the previous notes array,
        // except for the old note which is replaced by the updated version of it returned by the server
        // map method creates a new array by mapping every item from the old array into an item in the new array
        // In this case, the new array is created conditionally so that if note.id !== id is true, we simply copy the item from the old array into the new array.
        // If the condition is false, then the note object returned by the server is added to the array instead.
        setNotes(notes.filter(n => n.id !== id))
      })
      .catch(error => {
        setErrorMessage(
          `Note '${note.content}' was already deleted from the server`
        )
        // Show the notification for 5 seconds
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        // Remove the note from the state with array filter method
        setNotes(notes.filter(n => n.id !== id))
      })
    }

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <div>
        {/* setShowAll(!showAll) -> Switch from True (Filter the important notes) or False (Show all notes) and vice versa */}
        <button onClick={() => setShowAll(!showAll)}>
          {/* Value depends on show all state */}
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {/* Use Map function to render the notes list */}
        {notesToShow.map(note =>
          <Notes
            key={note.id}
            notes={note}
            toggleImportance={() => toggleImportanceOf(note.id)} 
            deleteNote={() => deleteNote(note.id)}
            />
        )}
      </ul>
      {/* Submit form */}
      <form onSubmit={addNote}>
        <input type="text" name="newNote" value={newNote} onChange={handleNoteChange} placeholder="a new note" />
        <button type="submit">Add</button>
      </form>
      <Footer />
    </div>
  )
}
export default App;
