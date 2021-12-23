import React from "react"
import Part from "./Part"
const Content = ({parts}) => {
    return (
    <div>
        {/* Change this to map and i will be iterative and acts a key */}
    {/* <Part part={props.parts[0].name} exercises={props.parts[0].exercises}/>
    <Part part={props.parts[1].name} exercises={props.parts[1].exercises}/>
    <Part part={props.parts[2].name} exercises={props.parts[2].exercises}/> */}
    {parts.map((part , i) => <Part key={i} part={part.name} exercises={part.exercises}/>)}
    </div>
    )
}

export default Content