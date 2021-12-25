import React from "react"

const Notes = ({notes , toggleImportance}) => {
    // Add a button to toggle the important notes
    const label = notes.important
    ? 'Mark not important' : 'Mark important'
    return (
        <li>
            {notes.content} { ' '}
            <button onClick= {toggleImportance}>{label}</button> 
        </li> 
    )
}

export default Notes