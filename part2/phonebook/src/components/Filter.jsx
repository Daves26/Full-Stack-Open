const Filter = ({filter, handleFilterChange}) => {
    return (
        <input value={filter} onChange={handleFilterChange}></input>
    )
}

export default Filter