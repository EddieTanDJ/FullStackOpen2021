import React , {useState} from "react";
import './App.css';

// Create component for header
const Header = (props) => <h1>{props.Name}</h1>

// Create Anecdote component
const Anecdote = (props) => {
  return (
    <div>
      <p>{props.text}</p>
      {/* <p>{props.voteCount}</p> */}
    </div>
  )
}

// Create Button component
const Button = (props) => {
  return (
    <button onClick={props.onClick}>{props.text}</button>
  )
}



const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
   
  const [selected, setSelected] = useState(0)

  // Event handler for button for next anecdote
const nextAnecdote = () => {
  // Select a random anecdote between 0 and the length of the array
  // const newIndex = Math.floor(Math.random() * anecdotes.length)
  let newIndex = 0;
  if (selected === anecdotes.length - 1) {
     newIndex = 0
  } else {
     newIndex = selected + 1
  }
  setSelected(newIndex)
}

  return (
    <div>
      <Header Name="Anecdote of the day"/>
      {anecdotes[selected]}
      <br></br>
      <Button onClick={nextAnecdote} text="Next anecdote"/>
    </div>
  )
}


export default App;
