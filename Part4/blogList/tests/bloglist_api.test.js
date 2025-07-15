const assert = require('node:assert')
const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')

const Blog = require('../models/blog')
const helper = require('./test_helper')
const app = require('../app')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

describe('Blog API tests', () => {
  describe('GET /api/blogs', () => {
    test('returns blog posts in JSON format', async () => {
      await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)    
    })

    test('returns the correct amount of blogs', async () => {
      const response = await api.get('/api/blogs')

      assert.strictEqual(response.body.length, helper.initialBlogs.length)
    })

    test('unique identifier property of the blog post is named id', async () => {
      const response = await api.get('/api/blogs');
      
      assert(Object.keys(response.body[0]).includes('id'))
    })
  })  

  describe('POST /api/blogs', () => {
    test('succeeds with status code 201', async () => {
      const newBlog = {
        title: 'New Blog',
        author: 'Author Three',
        url: 'http://example_3.com',
        likes: 3
      }      

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const response = await api.get('/api/blogs')    
      const contents = response.body.map(b => b.title)
    
      assert.strictEqual(response.body.length, helper.initialBlogs.length + 1)    
      assert(contents.includes('New Blog'))
    })

    test('if likes are missing it will default to 0', async () => {
      const newBlog = {
        title: 'New Blog Without Likes',
        author: 'Author Four',
        url: 'https://example_4.com',
      }
    
      await api
        .post('/api/blogs')
        .send(newBlog)        
        .expect(201)
      
      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd[2].likes, 0)  
    })

    test('fails with status code 400 without the tittle data', async () => {
      const newBlog = {
        author: 'Author Five',
        url: 'https://example_5.com',
        likes: 3
      }
    
      await api
      .post('/api/blogs')
      .send(newBlog)      
      .expect(400)  
    
      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
    })
    
    test('fails with status code 400 without the url data', async () => {
      const newBlog = {
        title: 'New Blog Without URL',
        author: 'Author Six',    
        likes: 3
      }
    
      await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)  
    
      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
    })
  })

  describe('DELETE /api/blog', () => {
    test('succeeds with status code 204 if id is valid', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]

      await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

      const blogsAtEnd = await helper.blogsInDb()

      const contents = blogsAtEnd.map(b => b.title)
      assert(!contents.includes(blogToDelete.title))

      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)
    })
  })

  describe('PUT /api/blogs', () => {
    test('succeeds with a valid id', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToUpdate = blogsAtStart[0]

      const editedBlog = { 
        title: 'Updated Title',
        author: 'Upadate Author',
        url: 'Updated Url',
        likes: blogToUpdate.likes + 1
      }

      await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(editedBlog)
        .expect(200)
    
      const updatedBlog = await Blog.findById(blogToUpdate.id)

      assert.strictEqual(updatedBlog.title, editedBlog.title)
      assert.strictEqual(updatedBlog.author, editedBlog.author)
      assert.strictEqual(updatedBlog.url, editedBlog.url)
      assert.strictEqual(updatedBlog.likes, editedBlog.likes)
    })

    test('fails with status code 400 if id is invalid', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToUpdate = blogsAtStart[0]

      const editedBlog = { 
        title: 'Updated Title',
        author: 'Upadate Author',
        url: 'Updated Url',
        likes: blogToUpdate.likes + 1
      }

      await api
        .put(`/api/blogs/invalidId12345`)
        .send(editedBlog)
        .expect(400)        
    
      const updatedBlog = await Blog.findById(blogToUpdate.id)  
      
      assert.strictEqual(updatedBlog.title, blogToUpdate.title) 
      assert.strictEqual(updatedBlog.author, blogToUpdate.author)
      assert.strictEqual(updatedBlog.url, blogToUpdate.url)
      assert.strictEqual(updatedBlog.likes, blogToUpdate.likes)
    })

    test('fails with status code 404 if id does not exist', async () => {
      const validNonexistingId = await helper.nonExistingId()

      const update = {
        title: 'updatedTitle',
        author: 'updatedAuthor',
        url: 'updatedUrl',
        likes: 1,
      }

      await api
        .put(`/api/blogs/${validNonexistingId}`)
        .send(update)
        .expect(404)    
    })
  })
})   
    
after(async () => {
  await mongoose.connection.close()
})