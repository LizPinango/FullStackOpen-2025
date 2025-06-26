const Filter = ({filter, handleFilterChange}) => {
  return(
    <div className="filter-container">
      <label htmlFor='filter-input'>Filter show with </label>
      <input id='filter-input' value={filter} onChange={handleFilterChange}/>
    </div>
  )
}

export default Filter