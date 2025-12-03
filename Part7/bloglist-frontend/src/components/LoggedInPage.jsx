import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import Blog from "./Blog";
import NewBlogForm from "./NewBlogForm";
import Togglable from "./Togglable";
import { clearUser } from "../reducers/userReducer";

const LoggedInPage = () => {
  const blogFormRef = useRef();

  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.user)

  const dispatch = useDispatch()

  return (
    <>
      <h2>Blogs</h2>
      <p>{user.name} logged in </p>
      <button onClick={() => dispatch(clearUser())}>Logout</button>

      <Togglable buttonLabel="New Blog" ref={blogFormRef}>
        <NewBlogForm />
      </Togglable>

      {[...blogs]
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog key={blog.id} blog={blog} user={user} />
        ))}
    </>
  );
};

export default LoggedInPage;
