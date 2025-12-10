import { useState } from "react";
import { useDispatch } from "react-redux";

import { createBlog } from "../reducers/blogReducer";

const NewBlogForm = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const dispatch = useDispatch();

  const addBlog = (event) => {
    event.preventDefault();

    const newBlog = {
      title: title,
      author: author,
      url: url,
    };

    dispatch(createBlog(newBlog));

    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <form onSubmit={addBlog} className="flex flex-col space-y-4">
      <div className="grid grid-cols-[1fr_11fr]">
        <label htmlFor="title">
          Title         
        </label>
        <input
          id="title"
          type="text"
          value={title}
          placeholder="A catchy title..."
          name="Title"
          onChange={({ target }) => setTitle(target.value)}
          className="border-2 border-primary-700 bg-gray-100 rounded-md p-1 w-full"
        />
      </div>
      <div className="grid grid-cols-[1fr_11fr]">
        <label htmlFor="author">
          Author          
        </label>
        <input
          id="author"
          type="text"
          value={author}
          placeholder="Author name..."
          name="Author"
          onChange={({ target }) => setAuthor(target.value)}
          className="border-2 border-primary-700 bg-gray-100 rounded-md p-1 w-full"
        />
      </div>
      <div className="grid grid-cols-[1fr_11fr]">
        <label htmlFor="url">
          Url          
        </label>
        <input
          id="url"
          type="text"
          value={url}
          placeholder="http://..."
          name="Url"
          onChange={({ target }) => setUrl(target.value)}
          className="border-2 border-primary-700 bg-gray-100 rounded-md p-1 w-full"
        />
      </div>
      <button type="submit" className="border-2 border-accent-dark bg-accent hover:bg-accent-light text-accent-dark font-bold text-lg rounded-lg py-1 px-2 w-3xs self-center">
        Create
      </button>
    </form>
  );
};

export default NewBlogForm;
