import PersonInfo from "./PersonInfo"

const PersonsDisplay = ({persons, filteredPersons, handleDelete}) => {
  const personsToShow = filteredPersons.length == 0 ? persons : filteredPersons

  return(
    <div>
      <h2>Numbers</h2>
      <div className="persons-container">      
        {personsToShow.map(p => <PersonInfo key={p.id} person={p} handleDelete={handleDelete}/> )}  
    </div>
    </div>    
  )
}

export default PersonsDisplay