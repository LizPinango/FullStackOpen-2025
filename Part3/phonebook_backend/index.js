require('dotenv').config()
const express = require('express');
const morgan = require('morgan');
const Person = require('./models/persons');

const app = express();
app.use(express.static('dist'));
app.use(express.json());

// Custom morgan token to log the request body
// Use morgan to log requests with method, url, status, content-length, response time, and body
morgan.token('body', req => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

app.get('/info', (req, res) => {
  const date = new Date();
  Person.countDocuments({}).then(count => {
    const info = `<p>Phonebook has info for ${count} people</p>
      <p>${date}</p>`;
    res.send(info);
  })
});

app.get('/api/persons', (req, res) => {
  Person.find({})
    .then(persons => {
      res.json(persons);
    })
})

app.get('/api/persons/:id', (req, res) => {
  Person.findById(req.params.id)
    .then(person => {
      if (person) {
        res.json(person);
      } else {
        res.status(404).end() 
      }
    })
    // eslint-disable-next-line no-undef
    .catch(error => next(error))
});

app.post('/api/persons', (req, res, next) => {
  const body = req.body;  
  
  const person = new Person ({    
    name: body.name,
    number: body.number
  });

  person.save()
    .then(savedPerson => {
      res.json(savedPerson)
    })
    .catch(error => next(error))
});  

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(204).end()
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
  const { name, number } = req.body

  Person.findById(req.params.id)
    .then(person => {
      if (!person) {
        return res.status(404).end()
      }

      person.name = name
      person.number = number

      return person.save().then((updatedPerson) => {
        res.json(updatedPerson)
      })
    })
    .catch(error => next(error))
})

const errorHandler = (error, req, res, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  }

  next(error)
}

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)
app.use(errorHandler)

// eslint-disable-next-line no-undef
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})