import { useState } from 'react'

const Header = (props) => {
  return (
    <h1>{props.text}</h1>
  )
}

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
)

const StatLine = (props) => {
  const text = props.text
  const value = props.value

  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Stats = (props) => {
  const t = props.allClicks
  
  if (t.length == 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }
  
  let total = 0
  let positive = 0
  t.forEach(value => {
    total += value
    if (value == 1) {
      positive += 1
    }
  })

  let average = total / t.length
  let positivePercent = (positive / t.length) * 100

  return (
    <div>
    <table>
      <tbody>
        <StatLine text='good' value={props.good} />
        <StatLine text='neutral' value={props.neutral} />
        <StatLine text='bad' value={props.bad} />
        <StatLine text='average' value={average} />
        <StatLine text='positive' value={positivePercent} />
      </tbody>
    </table>
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
    setAll(allClicks.concat(1))
    setGood(good + 1)
  }

  const neutralClick = () => {
    setAll(allClicks.concat(0))
    setNeutral(neutral + 1)
  }

  const badClick = () => {
    setAll(allClicks.concat(-1))
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
      <Stats good={good} neutral={neutral} bad={bad} allClicks={allClicks} />
    </div>
  )
}

export default App