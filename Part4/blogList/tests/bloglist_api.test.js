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
  let blogObject = new Blog(helper.initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(helper.initialBlogs[1])
  await blogObject.save()
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
    test('creates a new blog post', async () => {
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

    test('fails without the tittle data', async () => {
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
    
    test('fails without the url data', async () => {
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
})   
    
after(async () => {
  await mongoose.connection.close()
})