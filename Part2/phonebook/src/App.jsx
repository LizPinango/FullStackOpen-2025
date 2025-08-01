import { useState, useEffect } from 'react'

import personsServices from './services/persons'
import NewPersonForm from './components/NewPersonForm'
import Filter from './components/Filter'
import PersonsDisplay from './components/PersonsDisplay'
import Notification from './components/Notification'
import './App.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('');
  const [filteredPersons, setFilteredPersons] = useState([])
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    personsServices
      .getAll()      
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const nameExists = persons.find(p => p.name === newName)   
    
    if (nameExists){
      if (window.confirm(`${nameExists.name} is already added to the phonebook, replace the old number with the new one?`)){        
        const updatedPerson = {...nameExists, number: newNumber} 
        personsServices
          .update(updatedPerson.id, updatedPerson) 
          .then(returnedPerson => {
            setPersons(persons.map(p => p.id !== returnedPerson.id ? p : returnedPerson))
            handleMessage(`Changed ${returnedPerson.name} number`)
          })
          .catch(error => { 
            setError(true);
            handleMessage(`Information of ${updatedPerson.name} has been removed from server`)
          })
      } 
    } else {      
      const newPerson = {        
        name: newName,
        number: newNumber      
      }        
      personsServices
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson)) 
          handleMessage(`Added ${returnedPerson.name}`) 
        })   
        .catch(error => { 
          setError(true);
          handleMessage(error.response.data.error)
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
          handleMessage(`Deleted ${name}`)         
        })
        .catch(error => { 
          setError(true);
          handleMessage(`${returnedPerson.name} could not be deleted`)
        })
    }    
  }

  const handleMessage = (message) => {
    setMessage(message)          
    setTimeout(() => {
      setMessage(null);  
      setError(false)    
    }, 5000)
  }
  
  return (
    <main>
      <h2>Phonebook</h2>  
      <Filter filter={filter} handleFilterChange={handleFilterChange}/>

      <Notification message={message} error={error}/>
      
      <div className='phonebook-container'>
        <section>
          <PersonsDisplay persons={persons} filteredPersons={filteredPersons} handleDelete={handleDelete}/>
        </section>
        <aside>
          <NewPersonForm 
            addPerson={addPerson} 
            newName={newName} 
            newNumber={newNumber}
            handleNameChange={handleNameChange}          
            handleNumberChange={handleNumberChange} 
          />      
        </aside>
      </div>  
    </main>
  )
}

export default App