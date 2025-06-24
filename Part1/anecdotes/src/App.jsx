import { useState } from 'react'
import './App.css'

const VotesDisplay = ({votes}) => {
  return(
    <p>Votes: {votes}</p>
  )
}

const MostVoted = ({anecdotes, votes}) => {
  let maxVotes = 0;
  let maxVotesIndex = 0;  
  const length = votes.length;
  for (let i = 0; i<length; i++){       
    if(maxVotes<votes[i]){      
      maxVotes = votes[i];
      maxVotesIndex = i;
    }
  }
     
  return (
    <>
      <p>"{anecdotes[maxVotesIndex]}"</p>      
      <VotesDisplay votes={maxVotes}/>
    </>
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
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(8).fill(0))
  
  const generateAnecdote = () => {
    const num = Math.floor(Math.random() * anecdotes.length);  
    setSelected(num);
  }

  const addVote = () => {
    const copy = [ ...votes ];    
    copy[selected] += 1;    
    setVotes(copy);    
  }

  return (
    <div className='container'>
      <h1>Anecdote of the Day</h1>
      <p>"{anecdotes[selected]}"</p>      
      <VotesDisplay votes={votes[selected]}/>

      <div>
        <button onClick={() => addVote()}>vote</button>
        <button onClick={() => generateAnecdote()}>next anecdote</button>  
      </div>      

      <h2>Anecdote with the most votes</h2>
      <MostVoted anecdotes={anecdotes} votes={votes}></MostVoted>    
    </div>
  )
}

export default App