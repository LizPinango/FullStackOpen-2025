import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Heart, Trash2 } from "lucide-react";

import { likeBlog, deleteBlog, commentBlog } from "../reducers/blogReducer";

const BlogPage = () => {
  const id = useParams().id
  const blog = useSelector(({ blogs }) => blogs.find(b => b.id === id))
  const loggedUser = useSelector((state) => state.loggedUser)  

  const dispatch = useDispatch();

  if (!blog) {
    return <div>loading ...</div>;
  }

  let canRemove = false;

  if (blog.user && blog.user.username === loggedUser.username) canRemove = true;

  const handleDelete = (blog) => {
    if (window.confirm(`Do you want to delete the blog "${blog.title}" ?`)) {
      dispatch(deleteBlog(blog));
    }
  };

  const handleComment = (event) => {
    event.preventDefault();
    const comment = event.target.comment.value;
    dispatch(commentBlog({ comment }, blog.id));
    event.target.comment.value = "";
  }

  return (
    <div className="mx-4 my-10 text-primary-700">
      <h2 className="text-4xl font-bold text-center mb-10">
        {blog.title} - {blog.author}
      </h2>
      <span className="text-lg">{blog.url}</span>
      <div className="flex justify-around mt-4">        
        <span className="text-lg font-bold">
          save by {blog.user ? blog.user.username : "anonymous"}
        </span>
        <div className="flex justify-end space-x-2">
          <button onClick={() => dispatch(likeBlog(blog))} className="border-2 border-primary-700 hover:border-accent bg-primary-50 hover:bg-accent-light hover:text-accent rounded-lg py-1 px-2">
            <div className="flex space-x-1">
              <Heart /><span>{blog.likes}</span>
            </div>          
          </button>        
          {canRemove && (
            <button onClick={() => handleDelete(blog)} className="border-2 border-primary-700 hover:border-gray-700 bg-primary-50 hover:bg-gray-200 hover:text-gray-700 rounded-lg py-1 px-2">
              <div>
                <Trash2 />  
              </div>            
            </button>
          )}
        </div>        
      </div>
      <div className="mt-10">
        <form onSubmit={handleComment} className="flex flex-col items-center space-y-4">
          <textarea name="comment" className="border rounded-lg bg-gray-100 w-4/6 h-24 p-2"></textarea>
          <button type="submit" className="border-2 border-primary-700 bg-primary-50 hover:bg-primary-700 hover:text-primary-50 font-bold rounded-lg py-1 px-2">
            comment
          </button>
        </form>  
        <div className="px-10">
          <h3 className="mt-10 text-xl font-bold">Comments</h3>
          {blog.comments && blog.comments.length > 0 ? (
            <ul className="mt-4">
              {blog.comments.map((comment, index) => (
                <li key={index}>
                  <div className="rounded-lg bg-gray-100 border-2 border-primary-700 my-2 p-2">
                    <p>{comment}</p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No comments yet</p>
          )}   
        </div>                   
      </div>
    </div>
  );
};

export default BlogPage;
