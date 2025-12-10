import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";

import Notification from "./components/Notification";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import UsersPage from "./pages/usersPage";
import UserPage from "./pages/UserPage";
import BlogPage from "./pages/BlogPage";
import HomePage from "./pages/HomePage";
import { initializeBlogs } from "./reducers/blogReducer";
import { initializeUser } from "./reducers/loggedUserReducer";
import { usersInit } from "./reducers/usersReducer";

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
        <LoginPage />
      </div>
    )
  }

  return (
    <div>
      <Navbar />
      <Notification />

      <Routes>
        <Route path="/users" element={<UsersPage />} />
        <Route path="/users/:id" element={<UserPage />}/>
        <Route path="/blogs/:id" element={<BlogPage />}/>
        <Route path="/" element={<HomePage />} />
      </Routes>      
    </div>
  );
};

export default App;
