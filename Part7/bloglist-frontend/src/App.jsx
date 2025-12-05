import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";

import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import LoggedInPage from "./components/LoggedInPage";
import { initializeBlogs } from "./reducers/blogReducer";
import { initializeUser, clearUser } from "./reducers/loggedUserReducer";
import { usersInit } from "./reducers/usersReducer";
import UsersPage from "./pages/usersPage";
import UserPage from "./pages/UserPage";
import BlogPage from "./pages/BlogPage";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeUser())
    dispatch(initializeBlogs());
    dispatch(usersInit())
  }, []);

  const loggedUser = useSelector((state) => state.loggedUser)  

  if (!loggedUser) {
    return (
      <div>
        <Notification />
        <LoginForm />
      </div>
    )
  }

  return (
    <div>
      <h2>Blogs</h2>
      <p>{loggedUser.name} logged in </p>
      <button onClick={() => dispatch(clearUser())}>Logout</button>
      
      <Notification />

      <Routes>
        <Route path="/users" element={<UsersPage />} />
        <Route path="/users/:id" element={<UserPage />}/>
        <Route path="/blogs/:id" element={<BlogPage />}/>
        <Route path="/" element={<LoggedInPage />} />
      </Routes>      
    </div>
  );
};

export default App;
