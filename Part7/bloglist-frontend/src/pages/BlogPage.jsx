import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { likeBlog, deleteBlog, commentBlog } from "../reducers/blogReducer";

const BlogPage = () => {
  const id = useParams().id
  const blog = useSelector(({ blogs }) => blogs.find(b => b.id === id))
  const loggedUser = useSelector((state) => state.loggedUser)  

  const dispatch = useDispatch();

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
    <div className="blog-container">
      <h2>
        {blog.title} - {blog.author}
      </h2>
      <div>
        <p>{blog.url}</p>
        <p>likes {blog.likes}</p>
        <button onClick={() => dispatch(likeBlog(blog))}>like</button>
        <p>save by {blog.user ? blog.user.username : "anonymous"}</p>
        {canRemove && (
          <button onClick={() => handleDelete(blog)}>delete</button>
        )}
      </div>
      <div>
        <h3>Comments</h3>
        <p> Add a comment</p>
        <form onSubmit={handleComment}>
          <input type="text" name="comment" />
          <button type="submit">add comment</button>
        </form>
        {blog.comments && blog.comments.length > 0 ? (
          <ul>
            {blog.comments.map((comment, index) => (
              <li key={index}>{comment}</li>
            ))}
          </ul>
        ) : (
          <p>No comments yet</p>
        )}
      </div>
    </div>
  );
};

export default BlogPage;
