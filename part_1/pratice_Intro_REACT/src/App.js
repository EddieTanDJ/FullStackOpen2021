import React , {useState} from "react";

// Create hello world REACT application

const Hello = (prams) => {
  return (
    <div>
      <p>Hello {prams.name}, you are {prams.age}</p>
    </div>
  )
}

// Function that return a function
const helloMsg = (who) => {
  const handler = () => console.log("Hello" , who , "!")
  return handler
}


// Create footer component that shows the creator of the app
const Footer = () => {
  return (
    <div>
      greeting app created by <a href="https://github.com/EddieTanDJ/FullStackOpen2021">EddieTanDJ</a>
    </div>
  )
}

// Create display component that shows the counter
const Display = ({counter}) => {
  return (
    <div>Counter: {counter}</div>
  )
}

// Create Button component
const Button = (props) => {
  return (
    <button onClick={props.onClick}>{props.text}</button>
  )
}

// ConditionaL rendering
const History = (props) => {
  console.log(props.allClicks)
  if (props.allClicks.length === 0) {
    return (
      <div>The app is used by pressing the buttons</div>
    )
  }
  return (
    <div>
      {/* Display all clicks by joining all the items into a single string*/}
      button press history: {props.allClicks.join(' ')}
    </div>
  )
}


const App = (props) => {
  const name = "Eddie"
  const age = 30
  // Set the initial counter state
  // When data changes, re-render the UI
  // Reacter value is a state variable
  // Setter function is a function that changes the state
  // Handles react data changes
  // Optional argument is the default state
  const [counter, setCounter] = useState(0)
  // Set left and right State with initial value of 0 in JSON using useState
  const [clicks, setClicks] = useState({
    left: 0, right: 0
  })
  // Set left state with initial value of 0 in JSON using useState
  const [left, setLeft] = useState(0)
  // Set right state with initial value of 0 in JSON using useState
  const [right, setRight] = useState(0)
  // Set all clicks state
  const [allClicks, setAllClicks] = useState([])
  // Event handler for left button click Array
  const handleLeftClickArray = () => {
    console.log('left button clicked')
    setAllClicks(allClicks.concat('L'))
    setLeft(left + 1)
    // console.log(allClicks)
  }
  // Event handler for right button click Array
  const handleRightClickArray = () => {
    console.log('right button clicked')
    setAllClicks(allClicks.concat('R'))
    setRight(right + 1)
    // console.log(allClicks)
  }

  // Automatically increment counter every second
  // setTimeout(() => {
  //   // Causes the component to re-render
  //   setCounter(counter + 1)
  // }, 1000)

  // () => is an ES6 Javascript arrow function
  // Event handler for Plus buttonq
  const handlePlus = () => setCounter(counter + 1)
  // Event handler for Minus button
  const handleMinus = () => setCounter(counter - 1)
  // Event handler for Set it to Zero button
  const handleSetToZero = () => setCounter(0)
  // Event handler for Left button
  const handleLeftClicks = () =>{
    const newClicks = {
      // Using object spread operator to copy the right clicks
      // ...clicks creates a new object that has copies of all of the properties of the clicks object.
      // Same as shallow copy
      // {...clicks} is the same as {left: clicks.left, right: clicks.right}
      ...clicks,
      left: clicks.left + 1
      // right: clicks.right
    }
    setClicks(newClicks)
  }
  // Event handler for Right button
  const handleRightClicks = () => {
    const newClicks = { 
      ...clicks,
      // left: clicks.left, 
      right: clicks.right + 1 
    }
    setClicks(newClicks)
  }



  /*
  * Can be simplified to:
  * const handleLeftClick = () =>
  * setClicks({ ...clicks, left: clicks.left + 1 })
  *
  * const handleRightClick = () =>
  * setClicks({ ...clicks, right: clicks.right + 1 })
  */

  // DO NOT DEFINE A COMPONENT INSIDE ANOTHER COMPONENT
  // const Display = props => <div>{props.value}</div>


  console.log("rendering..." , counter)
  return (
    <div>
      <h1>Greetings</h1>
      <Hello name="Eddie" age={23}/>
      <Hello name={name} age={age}/>
      <Display counter={counter} />
      <button onClick={helloMsg("eddie")}> button</button>
       {/* Take note event handler is always a function or a reference to the function */}
      <Button onClick={handlePlus} text="Plus"/>
      <Button onClick={handleMinus} text="Minus"/>
      <Button onClick={handleSetToZero} text="Set to Zero"/>
      <br></br>
      <div>
        {left}
          <Button onClick={handleLeftClickArray} text="Left"/>
          <Button onClick={handleRightClickArray} text="Right"/>
        {right}
        <History allClicks={allClicks}/>
      </div>
      <Footer/>
    </div>
  )
}
export default App;
