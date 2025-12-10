import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { CircleUser } from "lucide-react"

import BlogCard from "../components/BlogCard"

const UserPage = () => {
  const id = useParams().id
  const user = useSelector(({ users }) => users.find(u => u.id === id) )

  if (!user) {
    return null
  }

  return (
    <div className="text-primary-700 my-10 px-20">
      <div className="flex items-center space-x-2 my-10">
        <CircleUser className="w-10 h-10" /><span className="text-4xl font-bold">{user.name}</span>
      </div>

      <span className="text-2xl font-bold">Added Blogs</span>

      {user.blogs.map(b => (
        <BlogCard key={b.id} blog={b} /> 
      ))}            
    </div>
  )
}

export default UserPage