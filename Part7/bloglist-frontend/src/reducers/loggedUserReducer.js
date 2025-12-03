import { createSlice } from "@reduxjs/toolkit";

import loginService from '../services/login'
import { setNotification } from "./notificationReducer";

const loggedUserSlice = createSlice ({
  name: "loggedUser",
  initialState: null,
  reducers: {
    set (state, action) {
      return action.payload
    },
    clear (state, action) {
      return null
    }
  }
})

const { set, clear } = loggedUserSlice.actions

export const loginUser = (username, password) => {
  return async (dispatch) => {
    try {
      const loggedUser = await loginService.login({username, password})
      window.localStorage.setItem("loggedUser", JSON.stringify(loggedUser))
      dispatch(set(loggedUser))
    } catch (e) {
      dispatch(setNotification("Wrong credentials", 5, true));
    }    
  }
}

export const initializeUser = () => {
  return async (dispatch) => {
    const loggedUser = JSON.parse(window.localStorage.getItem("loggedUser"));
    dispatch(set(loggedUser))
  }
}

export const clearUser = () => {
  return async (dispatch) => {
    window.localStorage.removeItem("loggedUser");
    dispatch(clear())
  }
}

export default loggedUserSlice.reducer
