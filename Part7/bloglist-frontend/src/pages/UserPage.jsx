import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"

const UserPage = () => {
  const id = useParams().id
  const user = useSelector(({ users }) => users.find(u => u.id === id) )

  if (!user) {
    return null
  }

  return (
    <>
      <h2>{user.name}</h2>

      <p>added Blogs</p>

      <ul>
        {user.blogs.map(b => (
          <li key={b.id}>{b.title}</li>
        ))}
      </ul>      
    </>
  )
}

export default UserPage