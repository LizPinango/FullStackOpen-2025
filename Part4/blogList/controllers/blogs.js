const blogsRouter = require('express').Router();
const jwt = require('jsonwebtoken')

const Blog = require('../models/blog');
const User = require('../models/user')
const { userExtractor } = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response, next) => {
  try {
    const blog = await Blog
      .findById(request.params.id)
      .populate('user', { username: 1, name: 1 })

    if (blog) {
      response.json(blog)
    } else {
      response.status(404).end()
    } 
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.post('/', userExtractor, async (request, response, next) => {
  const body = request.body
  const user = request.user

  if (!user) {
    return response.status(400).json({ error: 'userId missing or not valid' })
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id
  })

  try {
    const savedBlog = await blog.save()    
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    await savedBlog.populate('user', { username: 1, name: 1 })
    response.status(201).json(savedBlog)
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.delete('/:id', userExtractor, async(request, response, next) => {
  const blog = await Blog.findById(request.params.id)
  const user = request.user

  if(!blog.user || blog.user.toString() !== user.id.toString()){
    return response.status(401).json({error: 'blog can only be delete by the user who add it'})
  }
  
  try {
    await blog.deleteOne()
    user.blogs = user.blogs.filter(b => b.toString() !== request.params.id)  
    await user.save()
    response.status(204).end()
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  try {
    const updatedBlog = await Blog
      .findByIdAndUpdate(request.params.id, blog, { new: true })
      .populate('user', { username: 1, name: 1 })
    if(!updatedBlog){
      response.status(404).send({ error: 'The Blog has been eliminated' })
    }else{
      response.status(200).json(updatedBlog) 
    }    
  } catch (exception) {
    next(exception)
  }  
})
/**
 * findByIdAndUpdate returns null when the id doesn't exists in the DB
 * the catch doesn't work in that case
 * therefor I use and if to verify that the method response with something
 * the catch is for the validation
 */

module.exports = blogsRouter;