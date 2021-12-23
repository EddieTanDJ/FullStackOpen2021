import React from "react"

const PersonForm = ({onSubmit, newName, handleNameChange, newNumber, handleNumberChange}) => {
    return (
        <form onSubmit={onSubmit}>
        <div>
            name: <input type="text" name="newName" value={newName} onChange={handleNameChange}/>
            number: <input type="text" name="newNumber" value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
            <button type="submit">add</button>
        </div>
        </form>
    )
}

export default PersonForm
