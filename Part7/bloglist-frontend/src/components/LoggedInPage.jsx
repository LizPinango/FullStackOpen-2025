import { useRef } from "react";
import { useSelector } from "react-redux";

import Blog from "./Blog";
import NewBlogForm from "./NewBlogForm";
import Togglable from "./Togglable";

const LoggedInPage = () => {
  const blogFormRef = useRef();

  const blogs = useSelector((state) => state.blogs);
  const loggedUser = useSelector((state) => state.loggedUser)

  return (
    <>
      <Togglable buttonLabel="New Blog" ref={blogFormRef}>
        <NewBlogForm />
      </Togglable>

      {[...blogs]
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog key={blog.id} blog={blog} user={loggedUser} />
        ))}
    </>
  );
};

export default LoggedInPage;
