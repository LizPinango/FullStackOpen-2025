import PersonInfo from "./PersonInfo"

const PersonsDisplay = ({persons, filteredPersons, handleDelete}) => {
  const personsToShow = filteredPersons.length == 0 ? persons : filteredPersons

  return(
    <div>
      {personsToShow.map(p => <PersonInfo key={p.id} person={p} handleDelete={handleDelete}/> )}  
    </div>
  )
}

export default PersonsDisplay