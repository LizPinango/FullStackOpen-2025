import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import LoggedInPage from "./components/LoggedInPage";
import { initializeBlogs } from "./reducers/blogReducer";
import { initializeUser } from "./reducers/userReducer";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeUser())
    dispatch(initializeBlogs());
  }, []);

  const user = useSelector((state) => state.user)

  if (!user) {
    return (
      <div>
        <Notification />
        <LoginForm />
      </div>
    )
  }

  return (
    <div>
      <Notification />
      <LoggedInPage />
    </div>
  );
};

export default App;
