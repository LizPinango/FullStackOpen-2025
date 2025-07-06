const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose')

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static('dist'))

// Custom morgan token to log the request body
morgan.token('body', req => JSON.stringify(req.body))
// Use morgan to log requests with method, url, status, content-length, response time, and body
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

// Connect to MongoDB
const password = process.argv[2]
const url = `mongodb+srv://laps1508:${password}@cluster0.bu4jfjr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Person = mongoose.model('Person', personSchema)

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
  Person.find({}).then(persons => {
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

app.post('/api/persons', (req, res) => {
  const body = req.body;
  
  if (!body.name || !body.number) {
    return res.status(400).json({ error: 'Name or number is missing' });  
  }

  if (persons.find(p => p.name === body.name)) {
    return res.status(400).json({ error: 'Name must be unique' });  
  }

  const newPerson = {
    id: (Math.random() * 10000).toFixed(0), // simple ID generation
    name: body.name,
    number: body.number
  };

  persons = persons.concat(newPerson);
  res.status(201).json(newPerson);

});  

app.delete('/api/persons/:id', (req, res) => {
  const id = req.params.id
  persons = persons.filter(p => p.id !== id)

  res.status(204).end()
})

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})