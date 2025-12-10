import { useState } from "react";
import { useDispatch } from "react-redux";

import { loginUser } from "../reducers/loggedUserReducer";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch()

  const handleLogin = (event) => {
    event.preventDefault();
    dispatch(loginUser(username, password))
    setUsername("");
    setPassword("");
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="border-2 border-accent rounded-lg bg-primary-100 p-4">
        <form onSubmit={handleLogin} className="flex flex-col space-y-4">
          <div className="grid grid-rows-2 gap-1">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
              className="border-2 border-accent bg-primary-50 rounded-md p-1.5"
            />
          </div>
          <div className="grid grid-rows-2 gap-1">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
              className="border-2 border-accent bg-primary-50 rounded-md p-1.5"
            />
          </div>
          <button type="submit" className="self-center border-2 border-primary-50 rounded-lg bg-primary-500 hover:bg-primary-700 py-1 px-4">
            <span className="text-primary-50">Login</span>
          </button>
        </form>
      </div>      
    </div>    
  );
};

export default LoginPage;
