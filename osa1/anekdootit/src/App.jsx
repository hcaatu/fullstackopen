import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
)

// this method isn't truly random but works for now
const randomInteger = (max) => {
  return (
    Math.floor(Math.random() * max)
  )
}

const Header = (props) => {
  return (
    <h1>{props.text}</h1>
  )
}

const Anecdote = ({anecdote, points}) => {
  return (
    <div>
      {anecdote} <br></br>
      has {points} votes <br></br>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Uint8Array(8))
  
  const nextClick = () => {
    const random = randomInteger(8)
    setSelected(random)
  }

  const voteClick = () => {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)
  }

  // returns the index of the largest element
  const maxOfArray = (arr) => {
    if (arr.length === 0) {
      return -1
    }

    var max = arr[0]
    var maxIndex = 0

    for (var i = 1; i < arr.length; i++) {
      if (arr[i] > max) {
        maxIndex = i
        max = arr[i]
      }
    }
    return maxIndex
  }

  const mostVotedAnecdote = anecdotes[maxOfArray(points)]
  const mostPoints = points[maxOfArray(points)]

  return (
    <div>
      <Header text='Anecdote of the day' />
      <Anecdote anecdote={anecdotes[selected]} points={points[selected]} />
      <Button handleClick={voteClick} text='vote' />
      <Button handleClick={nextClick} text='next anecdote'/>
      <Header text='Anecdote with the most votes' />
      <Anecdote anecdote={mostVotedAnecdote} points={mostPoints} />
    </div>
  )
}

export default App