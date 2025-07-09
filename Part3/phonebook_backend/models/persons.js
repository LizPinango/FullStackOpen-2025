require('dotenv').config()
const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

mongoose.set('strictQuery',false)
mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true,'Missing Name'],
    minLength: [3,'Must be at least 3 characters long'],
    unique: true
  },
  number: {
    type: String,
    required: [true,'Missing Number'],
    minLength: [8, 'Must be at least 8 characters long'],
    validate: {
      validator: v => /^\d{2,3}-\d+$/.test(v),
      message: () =>
        'Must have the following format: 040-6655678 or 02-1234567'
    }
  }
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)