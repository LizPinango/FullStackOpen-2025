import { createSlice } from "@reduxjs/toolkit"

import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    voteAnecdote(state, action) {
      const id = action.payload
      return state.map(anecdote =>
        anecdote.id !== id
          ? anecdote
          : { ...anecdote, votes: anecdote.votes + 1 }
      )
    },
    createAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }  
})

const { setAnecdotes, createAnecdote } = anecdoteSlice.actions

export const initializeAnecdotes = () => {  
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const appendAnecdote = (anecdote) => {  
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(anecdote)
    dispatch(createAnecdote(newAnecdote))
  }   
}

export const { voteAnecdote } = anecdoteSlice.actions
export default anecdoteSlice.reducer