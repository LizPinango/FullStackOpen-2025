require('dotenv').config()
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const Person = require('./models/persons');

const app = express();

app.use(express.static('dist'));
app.use(express.json());

// Custom morgan token to log the request body
// Use morgan to log requests with method, url, status, content-length, response time, and body
morgan.token('body', req => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/', (req, res) => {
  res.send('<h1>Phonebook</h1>');
});

app.get('/info', (req, res) => {
  const date = new Date();
  const info = `<p>Phonebook has info for ${persons.length} people</p>
                <p>${date}</p>`; 
  res.send(info);
});


app.get('/api/persons', (req, res) => {
  Person.find({})
    .then(persons => {
      res.json(persons);
    })
})

app.get('/api/persons/:id', (req, res) => {
  const id = req.params.id;   
  const person = persons.find(p => p.id === id);
  if (person) {   
    res.json(person);
  } else {
    res.status(404).send({ error: 'Person not found' });
  } 
});

app.post('/api/persons', (req, res, next) => {
  const body = req.body;
  
  if (!body.name || !body.number) {
    return res.status(400).json({ error: 'Name or number is missing' });  
  }

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
    .then(result => {
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
  } 

  next(error)
}

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})