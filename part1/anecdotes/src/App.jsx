import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0))
  const [mostPointsIndex, setMostPointsIndex] = useState(0)

  const handleNext = () => {
    const index = Math.floor(Math.random() * (anecdotes.length - 1)) 
    setSelected(index)
  }

  const handleVote = () => {
    const newPoints = {...points}
    newPoints[selected]++
    if (newPoints[selected] > newPoints[mostPointsIndex]) setMostPointsIndex(selected)
    console.log(mostPointsIndex)
    setPoints(newPoints)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <p>has {points[selected]} votes</p>
      <Button onClick={handleNext} text='next anecdote' />
      <Button onClick={handleVote} text='vote' />
      <h1>Anecdote with most votes</h1>
      {anecdotes[mostPointsIndex]}
    </div>
  )
}

const Button = ({text, onClick}) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

export default App