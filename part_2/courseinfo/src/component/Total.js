import React from "react"

const Total = ({parts}) => {
    // Use the reduce method to get the total of the course parts
    const Total = parts.reduce((sum, part) => sum + part.exercises, 0)
    return (
      <p style={{fontWeight: "bold"}}>
        total of {Total} exercises
      </p>
    )
}

  export default Total