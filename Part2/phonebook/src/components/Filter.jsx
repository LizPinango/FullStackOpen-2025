const Filter = ({filter, handleFilterChange}) => {
  return(
    <div>
      <label htmlFor='filter-input'>filter show with </label>
      <input id='filter-input' value={filter} onChange={handleFilterChange}/>
    </div>
  )
}

export default Filter