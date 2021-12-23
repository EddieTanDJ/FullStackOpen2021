import React , {useState} from "react";
import './App.css';
import Notes from './components/Notes'


const App = ({notes}) => {
  return (
    <div>
      <h1>Notes</h1>
      <ul>
      {/* Use Map function to render the notes list */}
        {notes.map(note => 
          <Notes key={note.id} notes={note}/>
        )}
      </ul>
    </div>
  )
}

export default App;
