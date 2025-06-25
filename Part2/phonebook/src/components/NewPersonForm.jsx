const NewPersonForm = ({addPerson, newName, handleNameChange, newNumber, handleNumberChange}) => {
  return(
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
  )
}

export default NewPersonForm