import { useState } from "react"

const Blog = ({ blog, likeBlog, user, deleteBlog }) => {
  const [visible, setVisible] = useState(false)
  
  let canRemove = false

  if (blog.user && blog.user.username === user.username) canRemove = true

  return(
    <div className="blog-container">
      <p>{blog.title} - {blog.author}</p>
      <button onClick={() => setVisible(!visible)}>{visible ? 'show less' : 'show more'}</button>
      {visible && 
        (<div>        
          <p>{blog.url}</p>
          <p>likes {blog.likes}</p>
          <button onClick={() => likeBlog(blog)}>like</button>
          <p>save by {blog.user ? blog.user.username : 'anonymous'}</p>      
          { canRemove && <button onClick={() => deleteBlog(blog)}>delete</button> }
        </div>) 
      }
    </div>  
  )  
}

export default Blog