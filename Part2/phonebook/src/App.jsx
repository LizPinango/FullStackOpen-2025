import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { 
      id: 1,
      name: 'Arto Hellas' 
    }
  ]) 
  const [newName, setNewName] = useState('')

  const addName = (event) => {
    event.preventDefault()
    const newPerson = {
      id: Math.floor(Math.random() * 1000),
      name: newName      
    }
    setPersons(persons.concat(newPerson))
    setNewName('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <form onSubmit={addName}>
        <div>
          <label htmlFor='name-input'>Name:</label>
          <input id='name-input' value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(p => <p key={p.id}>{p.name}</p> )}      
    </div>
  )
}

export default App