import { useSelector, useDispatch } from 'react-redux'

import { addVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificatinReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => {
    if( state.filter === ''){
      return state.anecdotes      
    }
    const re = new RegExp(state.filter, 'i')
    return state.anecdotes.filter(a => a.content.match(re))
  }) 

  const vote = anecdote => {
    dispatch(addVote(anecdote))
    dispatch(setNotification(`you voted '${anecdote.content}'`, 5000))
  }

  return (
    <div>
      {[...anecdotes].sort((a, b) => b.votes - a.votes).map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList