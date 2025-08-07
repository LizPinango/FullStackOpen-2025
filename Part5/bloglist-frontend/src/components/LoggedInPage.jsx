import Blog from './Blog'

const LoggedInPage = ({user, blogs, handleLogout}) => {
  return (
    <>
      <h2>Blogs</h2>
      <p>{user.name} logged in </p> 
      <button onClick={() => handleLogout()}>Logout</button>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </>
  )
}

export default LoggedInPage