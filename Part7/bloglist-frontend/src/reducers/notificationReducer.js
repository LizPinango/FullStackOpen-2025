import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: null,
  error: false,
};

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    set(state, action) {
      return { message: action.payload.message, error: action.payload.error };
    },
    clear(state, action) {
      return initialState;
    },
  },
});

const { set, clear } = notificationSlice.actions;

export const setNotification = (message, time, error = false) => {
  return (dispatch) => {
    dispatch(set({ message, error }));
    setTimeout(() => {
      dispatch(clear());
    }, time * 1000);
  };
};

export default notificationSlice.reducer;
