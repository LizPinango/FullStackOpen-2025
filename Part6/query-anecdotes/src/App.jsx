import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useContext} from 'react'

import NotificationContext from './NotificationContext'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAnecdotes, updateAnecdote } from './requests'

const App = () => {
  const { notificationDispatch } = useContext(NotificationContext)

  const queryClient = useQueryClient()

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    }
  })

  const handleVote = (anecdote) => {
    const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
    updateAnecdoteMutation.mutate(updatedAnecdote)
    notificationDispatch({ type: 'SET', payload: `you voted '${anecdote.content}'` })
    setTimeout(() => {
      notificationDispatch({ type: 'CLEAR' })
    }, 5000)
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,      
    retry: false
  })

  if (result.isLoading) {
    return <div>loading data...</div>
  }
 
  if (result.isError) {
    return <div>anecdote service not available due to server problems</div>
  }
  
  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App
