const assert = require('node:assert')
const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')

const Blog = require('../models/blog')
const app = require('../app')

const api = supertest(app)

const initialBLogs = [
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

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBLogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBLogs[1])
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

      assert.strictEqual(response.body.length, initialBLogs.length)
    })
  })  
})


after(async () => {
  await mongoose.connection.close()
})