import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('');
  const [filteredPersons, setFilteredPersons] = useState([])

  const addPerson = (event) => {
    event.preventDefault()
    const nameExists = persons.find(p => p.name === newName)   
    
    if (nameExists){
      alert(`${newName} is already added to phonebook`)      
    } else {      
      const newPerson = {
        id: Math.floor(Math.random() * 1000),
        name: newName,
        number: newNumber      
      }  
      setPersons(persons.concat(newPerson))      
    }    

    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)

  const handleFilterChange = (event) => {    
    setFilter(event.target.value)    
    if(event.target.value !== ''){
      const re = new RegExp(filter, 'i');    
      const filtPer = persons.filter(p => p.name.match(re));    
      setFilteredPersons(filtPer);
    }
    else{
      setFilteredPersons([]);
    }
  }

  const personsToShow = filteredPersons.length == 0 ? persons : filteredPersons

  return (
    <div>
      <h2>Phonebook</h2>

      <div>
        <label htmlFor='filter-input'>filter show with </label>
        <input id='filter-input' value={filter} onChange={handleFilterChange}/>
      </div>

      <h2>add a new</h2>

      <form onSubmit={addPerson}>
        <div>
          <label htmlFor='name-input'>Name: </label>
          <input id='name-input' value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          <label htmlFor='number-input'>Number: </label>
          <input id='number-input' value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {personsToShow.map(p => <p key={p.id}>{p.name} {p.number}</p> )}      
    </div>
  )
}

export default App