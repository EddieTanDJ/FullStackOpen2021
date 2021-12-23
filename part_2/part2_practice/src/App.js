import React , {useState} from "react"
import Notes from './components/Notes'


const App = (props) => {
    // Initialize state func with the notes array passed in the props
    const [notes, setNotes] = useState(props.notes)
    // Initialize state func with an empty string to store the new note
    const [newNote, setNewNote] = useState('')
    // Initialize state func with boolean to allow us to view the important notes
    const [showAll, setShowAll] = useState(true)
    // Add a new note
    const addNote = (e) => {
        e.preventDefault()
        console.log('button clicked:', e.target)
        
        const noteObject = {
          // Create a new note object that receive the content form the input 
            content: newNote,
            // Generate a date for the note
            date: new Date().toISOString(),
            // 50% chance of being important
            important: Math.random() < 0.5,
            id: notes.length + 1
        }
        // New notes will be added to the notes array using CONCAT method which The method does not mutate/update the original notes array
        setNotes(notes.concat(noteObject))
        // Reset the input value by calling the setNewNote func
        setNewNote('')
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

  return (
    <div>
      <h1>Notes</h1>
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
          <Notes key={note.id} notes={note}/>
        )}
      </ul>
      {/* Submit form */}
      <form onSubmit={addNote}>
        <input type="text" name="newNote" value={newNote} onChange = {handleNoteChange} placeholder="a new note"/>
        <button type="submit">Add</button>
      </form>

    </div>
  )
}

export default App;
