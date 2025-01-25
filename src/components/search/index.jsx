


export default function Search({ search, setSearch, handleSearch }) {

    return (
        <div className="search-container">
            <input
                type="text"
                placeholder="Enter city name"
                autoComplete="off"
                name="search"
                onChange={(e) => { setSearch(e.target.value) }}
            />
            <button onClick={handleSearch}>Search</button>
        </div>
    )
}