import React , {useState} from "react";
import './App.css';

// Create component for header
const Header = (props) => <h1>{props.courseName}</h1>


// Create button component
const Button = (props) => {
  return (
    <button onClick={props.onClick}>{props.text}</button>
  )
}

// Create statistic function
const Statistic = (props) => {
      if (props.text === "neutral" || props.text === "negative" || props.text === "positive"){
        return (
          <tr>
          <td>{props.text}</td>
          <td>{parseFloat(props.value).toFixed(2)} %</td>
          </tr>
        )
      }
      return (
        <tr>
        <td>{props.text}</td>
        <td>{props.value}</td>
        </tr>
      )
}

// Create statistics component that shows the counter for good, neutral and bad 
// Show the statistics of total clicks, average and positive feedback
const Statistics = (props) => {
  const {good, neutral, bad} = props.clicks
  const total = good + neutral + bad
  const average = (good - bad) / total
  const positive = good / total * 100
  const neutralRating = neutral / total * 100
  // Step 4: Show no feedback given if no feedback given
  if (total === 0) {
    return (
       <div>
          No feedback given
       </div>
    )
  }
  // Step 6: Display in HTML tab 
  return (
    <div>
      <table>
        <tbody>
          <Statistic text="good" value={good} />
          <Statistic text="neutral" value={neutral} />
          <Statistic text="bad" value={bad} />
          <Statistic text="all" value={total} />
          <Statistic text="average" value={average} />
          <Statistic text="positive" value={positive}/>
          <Statistic text="neutral" value={neutralRating} />
          <Statistic text="negative" value={100 - positive - neutralRating} />
        </tbody>
      </table>
    </div>  
  )
}

const App = () => {
  // save clicks of each button to its own state
  /* const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0) */

  // Further Refactoring for save clicks of each button to its own state:
  const [clicks, setClicks] = useState({
    good: 0, neutral: 0 , bad: 0
  })

  // Handle click event for good
  const handleGoodClick = () => setClicks({...clicks, good: clicks.good + 1})
  // Handle click event for neutral
  const handleNeutralClick = () => setClicks({...clicks, neutral: clicks.neutral + 1})
  // Handle click event for bad
  const handleBadClick = () => setClicks({...clicks, bad: clicks.bad + 1})
  return (
    <div>
      <div className="App">
        <Header courseName="Give feedback"/>
        <Button onClick={handleGoodClick} text="good"/>
        <Button onClick={handleNeutralClick} text="neutral"/>
        <Button onClick={handleBadClick} text="bad"/>
        <Header courseName="Statistics"/>
        <Statistics clicks={clicks}/>
      </div>
    </div>
  )
}

export default App;
