const assert = require('node:assert')
const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')

const User = require('../models/user')
const helper = require('./test_helper')
const app = require('../app')

const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('sekret', 10)
  const user = new User({ username: 'root', passwordHash })

  await user.save()
})

describe('User API tests', () => {
  describe('GET /api/users', () => {
    test('returns users in JSON format', async () => {
      await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)    
    })
  })

  describe('POST /api/users', () => {
    test('succeeds with a valid username and password', async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = {
        username: 'newUser',
        name: 'New User',
        password: 'password123',
      }

      await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const usersAtEnd = await helper.usersInDb()
      assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

      const usernames = usersAtEnd.map(u => u.username)
      assert(usernames.includes(newUser.username))
    })

    test('fails with status code 400 if username is already taken', async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = {
        username: 'root',
        name: 'New User',
        password: 'password123',
      }

      await api
        .post('/api/users')
        .send(newUser)
        .expect(400)

      const usersAtEnd = await helper.usersInDb()
      assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    })

    test('fails with status code 400 if password is too short', async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = {
        username: 'shortPassUser',
        name: 'Short Pass User',
        password: '12', 
      }

      const response = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)

      const usersAtEnd = await helper.usersInDb()
      assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    })

    test('fails with status code 400 if username is too short', async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = {
        username: 'us',
        name: 'Short Username User',
        password: '123456789', 
      }

      const response = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)

      const usersAtEnd = await helper.usersInDb()
      assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    })

    test('fail with status code 400 if password is not given', async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = {
        username: 'user1',
        name: 'No password User',        
      }

      const response = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)

      const usersAtEnd = await helper.usersInDb()
      assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    })

    test('fail with status code 400 if username is not given', async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = {       
        name: 'No Username User',
        password: '123456789', 
      }

      const response = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)

      const usersAtEnd = await helper.usersInDb()
      assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    })
  })
})

after(async () => {
  await mongoose.connection.close()
})