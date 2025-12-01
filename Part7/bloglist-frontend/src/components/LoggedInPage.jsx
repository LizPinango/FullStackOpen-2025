import { useRef } from "react";
import { useDispatch } from "react-redux";

import Blog from "./Blog";
import NewBlogForm from "./NewBlogForm";
import blogService from "../services/blogs";
import Togglable from "./Togglable";
import { setNotification } from "../reducers/notificationReducer";

const LoggedInPage = ({
  user,
  blogs,
  setBlogs,
  handleLogout
}) => {
  const blogFormRef = useRef();

  const dispatch = useDispatch()

  const createBlog = async (blogObject) => {
    blogService
      .create(blogObject)
      .then((returnedBlog) => {
        setBlogs(blogs.concat(returnedBlog));
        dispatch(setNotification(`a new blog '${returnedBlog.title}' by ${returnedBlog.author} added`, 5))
        blogFormRef.current.toggleVisibility();
      })
      .catch((err) => {
        dispatch(setNotification(err.response.data.error, 5, true))
      });
  };

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
        <NewBlogForm createBlog={createBlog} />
      </Togglable>

      {blogs
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
