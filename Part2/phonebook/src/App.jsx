import { useState } from 'react'
import NewPersonForm from './components/NewPersonForm'
import Filter from './components/Filter'
import PersonsDisplay from './components/PersonsDisplay'

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

  
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange}/>

      <h2>add a new</h2>
      <NewPersonForm 
        addPerson={addPerson} 
        newName={newName} 
        newNumber={newNumber}
        handleNameChange={handleNameChange}          
        handleNumberChange={handleNumberChange} 
      />      
      
      <h2>Numbers</h2>
      <PersonsDisplay persons={persons} filteredPersons={filteredPersons}/>
    </div>
  )
}

export default App