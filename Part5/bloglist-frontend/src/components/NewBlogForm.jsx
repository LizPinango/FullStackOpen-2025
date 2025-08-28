import { useState } from "react"

const NewBlogForm = ({createBlog}) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault(); 
    
    const newBlog = {
      title: title,
      author: author,
      url: url
    }

    createBlog(newBlog)

    setTitle('')
    setAuthor('')
    setUrl('')    
  } 

  return(
    <form onSubmit={addBlog}>
      <div>
        <label htmlFor="title">Title</label>
        <input 
          id="title"
          type="text"
          value={title}
          placeholder='A catchy title...'
          name="Title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        <label htmlFor="author">Author</label>
        <input
          id="author"
          type="text"
          value={author}
          placeholder='Author name...'
          name="Author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        <label htmlFor="url">Url</label>
        <input
          id="url"
          type="text"
          value={url}
          placeholder='http://...'
          name="Url"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type="submit">create</button>
    </form>
  )
}

export default NewBlogForm