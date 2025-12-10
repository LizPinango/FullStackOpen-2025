import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const UsersPage = () => {
  const users = useSelector((state) => state.users)

  return(
    <div className="my-10">
      <div className="text-center">
        <span className="text-4xl font-bold text-primary-700">Users</span>
      </div>
      <div className="flex justify-center mt-6">
        <table className="border-2 border-accent text-accent-dark bg-accent-light rounded-lg border-separate w-7/12">
          <thead>
            <tr className="grid grid-cols-2 text-lg pt-4 pb-2 px-4">
              <th></th>
              <th>Blogs</th>
            </tr>
          </thead>
          <tbody>
            {[...users].map(user => (
              <tr key={user.id} className="grid grid-cols-2 px-4 pb-4">
                <td>
                  <Link to={`/users/${user.id}`} className="underline underline-offset-2 text-xl hover:text-primary-700">
                    {user.name}
                  </Link>
                </td>
                <td className="place-self-center">{user.blogs.length}</td>
              </tr>
            ))}
          </tbody>
        </table>   
      </div>         
    </div>
  )
}

export default UsersPage