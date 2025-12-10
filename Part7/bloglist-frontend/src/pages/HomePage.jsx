import { useRef } from "react";
import { useSelector } from "react-redux";

import NewBlogForm from "../components/NewBlogForm";
import Togglable from "../components/Togglable";
import BlogCard from "../components/BlogCard";

const HomePage = () => {
  const blogFormRef = useRef();

  const blogs = useSelector((state) => state.blogs);

  return (
    <div className="my-10">
      <div className="text-center">
        <span className="text-4xl font-bold text-primary-700">Blog List</span>
      </div>
      <Togglable buttonLabel="New Blog" ref={blogFormRef}>
        <NewBlogForm />
      </Togglable>

      <div className="flex flex-col items-center">
        {[...blogs]
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <BlogCard key={blog.id} blog={blog} />    
          ))}
      </div>      
    </div>
  );
};

export default HomePage;
