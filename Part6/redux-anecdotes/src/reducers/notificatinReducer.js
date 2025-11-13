import { createSlice } from "@reduxjs/toolkit"

const initialState = 'welcome to the anecdote app'

const notificationSlice = createSlice({ 
  name: 'notification',
  initialState,
  reducers: {
    set(state, action) {    
      return action.payload
    },
    clear(state, action) {
      return null
    }
  }
})

export const { set, clear } = notificationSlice.actions

export const setNotification = (message, time) => {
  return dispatch => {
    dispatch(set(message))
    setTimeout(() => {
      dispatch(clear())
    }, time)
  }
}

export default notificationSlice.reducer