import { useState } from 'react'

const Header = (props) => {
  return (
    <h1>{props.text}</h1>
  )
}

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
)

const Statistics = (props) => {
  return (
    <div>
      good {props.good} <br></br>
      neutral {props.neutral} <br></br>
      bad {props.bad}
    </div>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allClicks, setAll] = useState([])

  const goodClick = () => {
    setAll(allClicks.concat("good"))
    setGood(good + 1)
    console.log("good")
    console.log(allClicks)
  }

  const neutralClick = () => {
    setAll(allClicks.concat("neutral"))
    setNeutral(neutral + 1)
  }

  const badClick = () => {
    setAll(allClicks.concat("bad"))
    setBad(bad + 1)
  }

  return (
    <div>
      <Header text="give feedback" />
      <p>
        <Button handleClick={goodClick} text="good" />
        <Button handleClick={neutralClick} text="neutral" />
        <Button handleClick={badClick} text="bad" />
      </p>
      <Header text="statistics" />
      <p>
        <Statistics good={good} neutral={neutral} bad={bad} />
      </p>
    </div>
  )
}

export default App