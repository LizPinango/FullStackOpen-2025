import PersonInfo from "./PersonInfo"

const PersonsDisplay = ({persons, filteredPersons}) => {
  const personsToShow = filteredPersons.length == 0 ? persons : filteredPersons

  return(
    <div>
      {personsToShow.map(p => <PersonInfo key={p.id} person={p}/> )}  
    </div>
  )
}

export default PersonsDisplay