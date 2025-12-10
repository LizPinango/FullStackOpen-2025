import { Link } from "react-router-dom";
import { Heart, MessageSquareMore } from "lucide-react";

const BlogCard = ({ blog }) => {
  return (
    <div className="border-2 border-accent bg-primary-50 text-primary-700 rounded-lg space-x-2 p-6 my-2 w-2/3">
      <Link to={`/blogs/${blog.id}`}>
        <span className="text-xl font-bold">{blog.title}</span>   
      </Link>
      <div className="flex space-x-6 mt-2">
        <div className="flex space-x-1">
          <Heart /><span>{blog.likes}</span>
        </div>
        <div className="flex space-x-1">
          <MessageSquareMore /><span>{blog.comments.length}</span>
        </div>    
      </div>    
    </div> 
  )
}

export default BlogCard;