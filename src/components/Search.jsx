import { useHistory } from "react-router-dom";
import { useState } from "react";


function Search() {
  const [searchInput, setSearchInput] = useState('');
  const history = useHistory();

  const searchImages = () => {

  }

  const handleSubmit = (event) => {
    event.preventDefault();

    
  }

  return (
    <>
      <h2>Search for a GIF!</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Search..."
          type="text"
          value={searchInput}
          onChange={(event) => setSearchInput(event.target.value)}
        />
        <button>Submit</button>
      </form>
    </>
  )
}


export default Search;