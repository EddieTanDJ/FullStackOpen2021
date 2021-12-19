import React from "react";

const Hello = (prams) => {
  return (
    <div>
      <p>Hello {prams.name}, you are {prams.age}</p>
    </div>
  )
}

const Footer = () => {
  return (
    <div>
      greeting app created by <a href="https://github.com/EddieTanDJ/FullStackOpen2021">EddieTanDJ</a>
    </div>
  )
}

const App = () => {
  const name = "Eddie"
  const age = 30
  return (
    <div>
      <h1>Greetings</h1>
      <Hello name="Eddie" age={23}/>
      <Hello name={name} age={age}/>
      <Footer/>
    </div>
  )
}
export default App;
