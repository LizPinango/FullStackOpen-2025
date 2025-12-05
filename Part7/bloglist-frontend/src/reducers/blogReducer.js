import { createSlice } from "@reduxjs/toolkit";

import blogService from "../services/blogs";
import { setNotification } from "./notificationReducer";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    appendBlog(state, action) {
      state.push(action.payload);
    },
    update(state, action) {
      return state.map((b) =>
        b.id !== action.payload.id ? b : action.payload,
      );
    },
    removeBlog(state, action) {
      return state.filter((b) => b.id !== action.payload);
    },
  },
});

const { setBlogs, appendBlog, update, removeBlog } = blogSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const createBlog = (blogObject) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogService.create(blogObject);
      dispatch(appendBlog(newBlog));
      dispatch(
        setNotification(
          `a new blog '${newBlog.title}' by ${newBlog.author} added`,
          5,
        ),
      );
    } catch (e) {
      dispatch(setNotification(e.response.data.error, 5, true));
    }
  };
};

export const likeBlog = (blogObject) => {
  return async (dispatch) => {
    try {
      const likedBlog = await blogService.like(
        {
          ...blogObject,
          likes: blogObject.likes + 1,
        },
        blogObject.id,
      );
      dispatch(update(likedBlog));
      dispatch(
        setNotification(
          `you liked '${likedBlog.title}' by ${likedBlog.author}`,
          5,
        ),
      );
    } catch (e) {
      dispatch(setNotification(e.response.data.error, 5, true));
    }
  };
};

export const deleteBlog = (blogObject) => {
  return async (dispatch) => {
    try {
      await blogService.remove(blogObject.id);
      dispatch(removeBlog(blogObject.id));
      dispatch(
        setNotification(
          `'${blogObject.title}' by ${blogObject.author} deleted`,
          5,
        ),
      );
    } catch (e) {
      dispatch(setNotification(e.response.data.error, 5, true));
    }
  };
};

export const commentBlog = (commentObject, id) => {
  return async (dispatch) => {
    try {
      const commentedBlog = await blogService.comment(commentObject, id);
      dispatch(update(commentedBlog));
      dispatch(
        setNotification(
          `you added a comment to '${commentedBlog.title}'`,
          5,
        ),
      );
    } catch (e) {
      dispatch(setNotification(e.response.data.error, 5, true));
    }
  };
}

export default blogSlice.reducer;
