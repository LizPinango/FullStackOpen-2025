import { createSlice } from "@reduxjs/toolkit"

import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    voteAnecdote(state, action) {
      const id = action.payload.id
      return state.map(anecdote => anecdote.id !== id ? anecdote : action.payload)
    },
    createAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }  
})

const { setAnecdotes, createAnecdote, voteAnecdote } = anecdoteSlice.actions

export const initializeAnecdotes = () => {  
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const appendAnecdote = anecdote => {  
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(anecdote)
    dispatch(createAnecdote(newAnecdote))
  }   
}

export const addVote = anecdote => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.update(anecdote.id, {...anecdote, votes: anecdote.votes+1})
    dispatch(voteAnecdote(updatedAnecdote))
  }
}

export default anecdoteSlice.reducer