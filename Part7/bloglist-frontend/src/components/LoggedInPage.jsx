import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import Blog from "./Blog";
import NewBlogForm from "./NewBlogForm";
import blogService from "../services/blogs";
import Togglable from "./Togglable";
import { setNotification } from "../reducers/notificationReducer";

const LoggedInPage = ({
  user,
  setBlogs,
  handleLogout
}) => {
  const blogFormRef = useRef();

  const dispatch = useDispatch()

  const blogs = useSelector(state => state.blogs)
  
  const likeBlog = async (blog) => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 };
    blogService
      .like(updatedBlog, blog.id)
      .then((returnedBlog) => {
        setBlogs(
          blogs.map((b) => (b.id !== returnedBlog.id ? b : returnedBlog)),
        );
        dispatch(setNotification(`you liked '${returnedBlog.title}' by ${returnedBlog.author}`, 5))
      })
      .catch((err) => {
        dispatch(setNotification(err.response.data.error, 5, true))
      });
  };

  const deleteBlog = async (blog) => {
    if (window.confirm(`Do you want to delete the blog "${blog.title}" ?`)) {
      blogService
        .remove(blog.id)
        .then(() => {
          setBlogs(blogs.filter((b) => b.id !== blog.id));
          dispatch(setNotification(`'${blog.title}' by ${blog.author} deleted`, 5))
        })
        .catch((err) => {
          dispatch(setNotification(err.response.data.error, 5, true))
        });
    }
  };

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
          <Blog
            key={blog.id}
            blog={blog}
            likeBlog={likeBlog}
            user={user}
            deleteBlog={deleteBlog}
          />
        ))}
    </>
  );
};

export default LoggedInPage;
