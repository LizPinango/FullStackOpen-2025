import { useState } from "react";
import { useDispatch } from "react-redux";

import { likeBlog, deleteBlog } from "../reducers/blogReducer";

const Blog = ({ blog, user }) => {
  const [visible, setVisible] = useState(false);

  const dispatch = useDispatch();

  let canRemove = false;

  if (blog.user && blog.user.username === user.username) canRemove = true;

  const handleDelete = (blog) => {
    if (window.confirm(`Do you want to delete the blog "${blog.title}" ?`)) {
      dispatch(deleteBlog(blog));
    }
  };

  return (
    <div className="blog-container">
      <p>
        {blog.title} - {blog.author}
      </p>
      <button onClick={() => setVisible(!visible)}>
        {visible ? "show less" : "show more"}
      </button>
      {visible && (
        <div>
          <p>{blog.url}</p>
          <p>likes {blog.likes}</p>
          <button onClick={() => dispatch(likeBlog(blog))}>like</button>
          <p>save by {blog.user ? blog.user.username : "anonymous"}</p>
          {canRemove && (
            <button onClick={() => handleDelete(blog)}>delete</button>
          )}
        </div>
      )}
    </div>
  );
};

export default Blog;
