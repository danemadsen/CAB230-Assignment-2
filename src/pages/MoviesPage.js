import React from 'react';
import { GET_Movies } from '../API';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import '../App.css';

function MoviesPage() {
  const [movies, setMovies] = React.useState([]);
  const [year, setYear] = React.useState('1996');
  const [title, setTitle] = React.useState('');
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(null);

  const handleYearChange = (event) => {
    setYear(event.target.value);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    GET_Movies(year, title, currentPage)
      .then(({ data, pagination }) => {
        setMovies(data);
        setTotalPages(pagination.lastPage);
      })
      .catch(error => console.log(error));
  };

  React.useEffect(() => {
    GET_Movies(year, title, currentPage)
      .then(({ data, pagination }) => {
        setMovies(data);
        setTotalPages(pagination.lastPage);
      })
      .catch(error => console.log(error));
  }, [year, title, currentPage]);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="movies-page">
      <h1 style={{ textAlign: 'center' }}>Movies</h1>
      <form onSubmit={handleSubmit} className="search-form">
        <div>
          <label htmlFor="title-input">Search by Title:</label>
          <input id="title-input" type="text" value={title} onChange={handleTitleChange} />
        </div>
        <div>
          <label htmlFor="year-input">Search by Year:</label>
          <input id="year-input" type="text" value={year} onChange={handleYearChange} />
        </div>
        <button type="submit">Search</button>
      </form>
      {movies.length > 0 ? (
        <table className="movies-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Year</th>
              <th>IMDb Rating</th>
              <th>Rotten Tomatoes Rating</th>
              <th>Metacritic Rating</th>
              <th>Classification</th>
            </tr>
          </thead>
          <tbody>
            {movies.map(movie => (
              <tr key={movie.id}>
                <td>
                  <Link to={`/movies/data/${movie.imdbID}`}>{movie.title}</Link>
                </td>
                <td>{movie.year}</td>
                <td>{movie.imdbRating}</td>
                <td>{movie.rottenTomatoesRating}</td>
                <td>{movie.metacriticRating}</td>
                <td>{movie.classification}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Loading....</p>
      )}
      <div className="pagination">
        <button className="prev-button" onClick={handlePrevPage} disabled={currentPage === 1}>
          Prev
        </button>
        <span>
          {currentPage} / {totalPages}
        </span>
        <button className="next-button" onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );  
}

export default MoviesPage;
