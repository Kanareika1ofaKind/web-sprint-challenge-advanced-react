import React, { useState } from 'react'
import * as Yup from "yup"; 

// Suggested initial states
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 // the index the "B" is at

const arr = [...Array(9).keys()]

// const formSchema = yup.object().shape({
//   email: yup
//          .string()
//          .email('Must be a valid email address')
//          .required("You're gotta give an email")
// })

export default function AppFunctional(props) {
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.

  const [message, setMessage] = useState(initialMessage)
  const [email, setEmail] = useState(initialEmail)
  const [steps, setSteps] = useState(initialSteps)
  const [index, setIndex] = useState(initialIndex)

  let cord = getXYMessage()




  function getXY() {
    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.
    for (let i = 0; i < 3; i++) {

      for (let j = 0; j < 3; j++) {
        if (index == (j + (i * 3)))
          return { x: j + 1, y: i + 1 }
      }
    }
  }

  function getXYMessage() {
    // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
    // returns the fully constructed string.

    let { x, y } = getXY()
    return `Coordinates (${x},${y})`
  }

  function reset() {
    // Use this helper to reset all states to their initial values.
    setMessage(initialMessage)
    setEmail(initialEmail)
    setSteps(initialSteps)
    setIndex(initialIndex)
  }

  function getNextIndex(direction) {
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.

    let { x, y } = getXY()
    let newIdx = index

    if (direction == 'right' && x < 3) {
      newIdx = index + 1
    }

    if (direction == 'down' && y < 3) {
      newIdx = index + 3
    }

    if (direction == 'left' && x > 1) {
      newIdx = index - 1
    }

    if (direction == 'up' && y > 1) {
      newIdx = index - 3
    }

    return newIdx
  }

  function move(evt) {
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.

    let newIdx = getNextIndex(evt.target.id)

    if (index !== newIdx) {
      setMessage('')
      setIndex(newIdx)
      setSteps(steps + 1)
    }

    else { setMessage(`You can't go ${evt.target.id}`) }

  }

  function onChange(evt) {
    // You will need this to update the value of the input.
  }

  function onSubmit(evt) {
    // Use a POST request to send a payload to the server.
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">{cord}</h3>
        <h3 id="steps">You moved {steps} times</h3>
      </div>
      <div id="grid">
        {
          arr.map(idx => (
            <div key={idx} className={`square${idx === index ? ' active' : ''}`}>
              {idx === index ? 'B' : null}
            </div>
          ))
        }
      </div>
      <div className="info">
        <h3 id="message">{message}</h3>
      </div>
      <div id="keypad">
        <button id="left" onClick={move}>LEFT</button>
        <button id="up" onClick={move}>UP</button>
        <button id="right" onClick={move}>RIGHT</button>
        <button id="down" onClick={move}>DOWN</button>
        <button id="reset" onClick={reset}>reset</button>
      </div>
      <form>
        <input id="email" type="email" placeholder="type email"></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  )
}