import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import LoggedInPage from "./components/LoggedInPage";
import { initializeBlogs } from "./reducers/blogReducer";
import { initializeUser } from "./reducers/loggedUserReducer";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeUser())
    dispatch(initializeBlogs());
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
      <Notification />
      <LoggedInPage />
    </div>
  );
};

export default App;
