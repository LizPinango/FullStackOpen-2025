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

  return (
    <>
      <h2>Blogs</h2>
      <p>{user.name} logged in </p> 
      <button onClick={() => handleLogout()}>Logout</button>

      <Togglable buttonLabel='New Blog' ref={blogFormRef}>
        <NewBlogForm createBlog={createBlog}/>
      </Togglable>
      
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </>
  )
}

export default LoggedInPage