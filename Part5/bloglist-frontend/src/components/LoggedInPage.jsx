import Blog from './Blog'
import NewBlogForm from './NewBlogForm'

const LoggedInPage = ({user, blogs, handleLogout, createBlog}) => {
  return (
    <>
      <h2>Blogs</h2>
      <p>{user.name} logged in </p> 
      <button onClick={() => handleLogout()}>Logout</button>
      <NewBlogForm createBlog={createBlog}/>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </>
  )
}

export default LoggedInPage