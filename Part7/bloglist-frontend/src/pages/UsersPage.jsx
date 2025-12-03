import { useSelector } from "react-redux";

const UsersPage = () => {
  const users = useSelector((state) => state.users)

  return(
    <>
      <h2>Users</h2>

      <table>
        <thead>
          <tr>
            <th></th>
            <th>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {[...users].map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>      
    </>
  )
}

export default UsersPage