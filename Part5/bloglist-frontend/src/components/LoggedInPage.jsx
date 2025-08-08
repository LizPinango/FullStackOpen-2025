import { useRef } from 'react'

import Blog from './Blog'
import NewBlogForm from './NewBlogForm'
import blogService from '../services/blogs'
import Togglable from './Togglable'

const LoggedInPage = ({user, blogs, setBlogs, handleLogout, handleMessage, setError}) => {
  const blogFormRef = useRef()

  const createBlog = async (blogObject) => {   
    blogService
      .create(blogObject)
        .then(returnedBlog => {
          setBlogs(blogs.concat(returnedBlog))          
          handleMessage(`a new blog '${returnedBlog.title}' by ${returnedBlog.author} added`)
          blogFormRef.current.toggleVisibility()
        })
        .catch(err => {                
          setError(true);
          handleMessage(err.response.data.error)
        })
  }

  const likeBlog = async (blog) => {
    const updatedBlog = {...blog, likes: blog.likes + 1}
    blogService
      .like(updatedBlog, blog.id)
        .then(returnedBlog => {
          setBlogs(blogs.map(b => b.id !== returnedBlog.id ? b : returnedBlog ))
          handleMessage(`you liked '${returnedBlog.title}' by ${returnedBlog.author}`)
        })
        .catch(err => {                
          setError(true);
          handleMessage(err.response.data.error)
        })
  }

  const deleteBlog = async (blog) => {
    if (window.confirm(`Do you want to delete the blog "${blog.title}" ?`)){
      blogService
        .remove(blog.id)
          .then(() => {
            setBlogs(blogs.filter(b => b.id !== blog.id))
            handleMessage(`'${blog.title}' by ${blog.author} deleted`)
          })
          .catch(err => {                
            setError(true);
            handleMessage(err.response.data.error)
          })
    }    
  }

  return (
    <>
      <h2>Blogs</h2>
      <p>{user.name} logged in </p> 
      <button onClick={() => handleLogout()}>Logout</button>

      <Togglable buttonLabel='New Blog' ref={blogFormRef}>
        <NewBlogForm createBlog={createBlog}/>
      </Togglable>

      {blogs.sort((a, b) => b.likes - a.likes).map(blog =>         
        <Blog key={blog.id} blog={blog} likeBlog={likeBlog} user={user} deleteBlog={deleteBlog}/>
      )}
    </>
  )
}

export default LoggedInPage