import { useRef } from "react";
import { useSelector } from "react-redux";

import Blog from "./Blog";
import NewBlogForm from "./NewBlogForm";
import Togglable from "./Togglable";

const LoggedInPage = ({ user, handleLogout }) => {
  const blogFormRef = useRef();

  const blogs = useSelector((state) => state.blogs);

  return (
    <>
      <h2>Blogs</h2>
      <p>{user.name} logged in </p>
      <button onClick={() => handleLogout()}>Logout</button>

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
