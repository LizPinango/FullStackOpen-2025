import { useState, useEffect } from 'react'

import personsServices from './services/persons'
import NewPersonForm from './components/NewPersonForm'
import Filter from './components/Filter'
import PersonsDisplay from './components/PersonsDisplay'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('');
  const [filteredPersons, setFilteredPersons] = useState([])

  useEffect(() => {
    personsServices
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const nameExists = persons.find(p => p.name === newName)   
    
    if (nameExists){
      alert(`${newName} is already added to phonebook`)      
    } else {      
      const newPerson = {        
        name: newName,
        number: newNumber      
      }        
      personsServices
        .create(newPerson)
        .then(response => {
          setPersons(persons.concat(response.data)) 
        })     
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
  
  const handleDelete = (id, name) => {
    if (window.confirm(`Do you want to delete ${name}`)) {      
      personsServices.deleteOne(id)
        .then(response => {                
          setPersons(persons.filter(p => p.id !== id))          
        })
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
      <PersonsDisplay persons={persons} filteredPersons={filteredPersons} handleDelete={handleDelete}/>
    </div>
  )
}

export default App