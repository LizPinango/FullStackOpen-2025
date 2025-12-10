import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";

import { clearUser } from "../reducers/loggedUserReducer";

const Navbar = () => {
  const dispatch = useDispatch();
  const loggedUser = useSelector((state) => state.loggedUser)  

  return (
    <div className="flex justify-between items-center bg-accent text-primary-800 p-4 mb-4">
      <div className="space-x-4">
        <span className="text-xl font-bold">BlogApp</span>
        <Link to={"/"} className="hover:bg-primary-50 rounded-lg font-bold py-2 px-3">Blogs</Link>
        <Link to={"/users/"} className="hover:bg-primary-50 rounded-lg font-bold py-2 px-3">Users</Link>
      </div>
      <div className="space-x-4">
        <span className="text-lg font-bold">{loggedUser.name} </span>
        <button onClick={() => dispatch(clearUser())} className="border-2 border-primary-700 rounded-xl bg-primary-100 hover:bg-primary-700 hover:text-primary-100 font-bold py-2 px-3">
          Logout
        </button>
      </div>
    </div>
  )
}

export default Navbar