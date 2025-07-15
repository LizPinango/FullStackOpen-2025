const Blog = require('../models/blog')

const initialBlogs = [
  {
    'title': 'Blog One',
    'author': 'Author One',
    'url': 'http://example_2.com',
    'likes': 0,
  },
  {
    'title': 'Blog Two',
    'author': 'Author Two',
    'url': 'http://example_2.com',
    'likes': 0,
  }
]

const nonExistingId = async () => {
  const blog = new Blog(
    { 
      title: 'willremovethissoon',
      author: 'Author',
      url: 'https://example_5.com',
      likes: 1
    }
  )
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = { initialBlogs, nonExistingId, blogsInDb }