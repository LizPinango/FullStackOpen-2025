import { useRef } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import NewBlogForm from "./NewBlogForm";
import Togglable from "./Togglable";

const LoggedInPage = () => {
  const blogFormRef = useRef();

  const blogs = useSelector((state) => state.blogs);

  return (
    <>
      <Togglable buttonLabel="New Blog" ref={blogFormRef}>
        <NewBlogForm />
      </Togglable>

      {[...blogs]
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Link to={`/blogs/${blog.id}`} key={blog.id}>
            <div>
              {blog.title}
            </div>
          </Link>
        ))}
    </>
  );
};

export default LoggedInPage;
