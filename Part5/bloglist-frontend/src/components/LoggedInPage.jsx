import Blog from './Blog'

const LoggedInPage = ({user, blogs}) => {
  return (
    <>
      <h2>Blogs</h2>
      <p>{user.name} logged in </p>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </>
  )
}

export default LoggedInPage