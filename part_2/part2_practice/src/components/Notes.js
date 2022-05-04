import React from "react"

const Notes = ({notes , toggleImportance, deleteNote}) => {
    // Add a button to toggle the important notes
    const label = notes.important
    ? 'Mark not important' : 'Mark important'
    return (
        <li className="note">
            {notes.content} { ' '}
            <button onClick= {toggleImportance}>{label}</button> 
            <button onClick={deleteNote}>Delete</button>
        </li> 
    )
}

export default Notes