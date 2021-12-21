import React , {useState} from "react";
import './App.css';

// Create component for header
const Header = (props) => <h1>{props.Name}</h1>

// Create Anecdote component
const Anecdote = (props) => {
  return (
    <div>
      <p>{props.text}</p>
      <p>has {props.voteCount} votes</p>
    </div>
  )
}

// Create Button component
const Button = (props) => {
  return (
    <button onClick={props.onClick}>{props.text}</button>
  )
}

// Create most voted anecdote component
const MostVotedAnecdote = (props) => {
  const mostVoted = Math.max(...props.votes)
  const index = props.votes.indexOf(mostVoted)
  const anecdote = props.anecdotes[index]
  console.log(anecdote)
  console.log(mostVoted)  
  if(mostVoted === 0) {
    return (
      <div>
        <p>No votes yet</p>
      </div>
    )
  }
  else {
    return (
      <div>
        <p>{anecdote}</p>
        <p>has {mostVoted} votes</p>
      </div>
    )
  }
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
  // Initialize the state of the vote counter for each anecdote to 0
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))

const vote = () => {
  // ...votes creates a new object that has copies of all of the properties of the votes object.
  const newVotes = [...votes]

  newVotes[selected] = votes[selected] + 1
  setVotes(newVotes)
  console.log(votes)
}

  // Event handler for button for next anecdote
const nextAnecdote = () => {
  // Select a random anecdote between 0 and the length of the array
  const newIndex = Math.floor(Math.random() * anecdotes.length)
  // let newIndex = 0;
  // if (selected === anecdotes.length - 1) {
  //    newIndex = 0
  // } else {
  //    newIndex = selected + 1
  // }
  setSelected(newIndex)
}

  return (
    <div>
      <Header Name="Anecdote of the day"/>
      <Anecdote text={anecdotes[selected]} voteCount={votes[selected]}/>
      <br></br>
      <Button onClick={vote} text="Vote"/>
      <Button onClick={nextAnecdote} text="Next anecdote"/>
      <Header Name="Anecdote with most votes"/>
      <MostVotedAnecdote anecdotes={anecdotes} votes={votes}/>
    </div>
  )
}


export default App;
