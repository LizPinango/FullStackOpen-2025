import { createSlice } from "@reduxjs/toolkit";

import blogService from '../services/blogs'
import { setNotification } from "./notificationReducer";

const blogSlice = createSlice ({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs (state, action) {
      return action.payload
    },
    appendBlog (state, action) {
      state.push(action.payload)
    }
  }
}) 

const { setBlogs, appendBlog } = blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (blogObject) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogService.create(blogObject)
      dispatch(appendBlog(newBlog))
      dispatch(setNotification(`a new blog '${newBlog.title}' by ${newBlog.author} added`, 5))
    } catch (e) {
      dispatch(setNotification(e.response.data.error, 5, true))
    }
  }
}

export default blogSlice.reducer