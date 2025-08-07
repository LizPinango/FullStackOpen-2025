import { useState } from "react"

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible ? '' : 'none' }

  return(
    <div className="blog-container">
      <p>{blog.title} - {blog.author}</p>
      <button onClick={() => setVisible(!visible)}>{visible ? 'show less' : 'show more'}</button>
      <div style={showWhenVisible}>        
        <p>{blog.url}</p>
        <p>likes {blog.likes}</p>
        <button>like</button>
        <p>save by {blog.user ? blog.user.username : 'anonymous'}</p>         
      </div>
    </div>  
  )  
}

export default Blog