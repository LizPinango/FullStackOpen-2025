const NewPersonForm = ({addPerson, newName, handleNameChange, newNumber, handleNumberChange}) => {
  return(
    <div className="form-container">
      <h2>Add a new</h2>
      <form className="add-form" onSubmit={addPerson}>
        <div className="input-container">
          <label htmlFor='name-input'>Name: </label>
          <input id='name-input' value={newName} onChange={handleNameChange}/>
        </div>
        <div className="input-container">
          <label htmlFor='number-input'>Number: </label>
          <input id='number-input' value={newNumber} onChange={handleNumberChange}/>
        </div>      
        <button className="add-btn" type="submit">add</button>      
      </form>
    </div>    
  )
}

export default NewPersonForm