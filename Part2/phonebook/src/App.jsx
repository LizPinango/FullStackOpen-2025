import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { 
      id: 1,
      name: 'Arto Hellas', 
      number: '123-1234567'
    }
  ]) 

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

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

  return (
    <div>
      <h2>Phonebook</h2>

      <form onSubmit={addPerson}>
        <div>
          <label htmlFor='name-input'>Name:</label>
          <input id='name-input' value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          <label htmlFor='number-input'>Number:</label>
          <input id='number-input' value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(p => <p key={p.id}>{p.name} {p.number}</p> )}      
    </div>
  )
}

export default App