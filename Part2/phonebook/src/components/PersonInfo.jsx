const PersonInfo = ({person, handleDelete}) => {
  return(
    <div className="person-info-container">
      <p>
        {person.name} {person.number} 
      </p>
      <button 
        className="delete-btn"
        onClick={() => handleDelete(person.id, person.name)}>
        delete
      </button>
    </div> 
  )
}

export default PersonInfo