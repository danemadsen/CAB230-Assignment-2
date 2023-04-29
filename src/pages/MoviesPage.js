import React from 'react';
import { fetchMovies } from '../API';

function MoviesPage() {
  const [movies, setMovies] = React.useState([]);
  const [year, setYear] = React.useState('1996');
  const [title, setTitle] = React.useState('');

  const handleYearChange = (event) => {
    setYear(event.target.value);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchMovies(year, title)
      .then(results => setMovies(results))
      .catch(error => console.log(error));
  };

  React.useEffect(() => {
    fetchMovies(year, title)
      .then(results => setMovies(results))
      .catch(error => console.log(error));
  }, [year, title]);

  return (
    <div>
      <h1>Popular Movies</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title-input">Search by Title:</label>
        <input id="title-input" type="text" value={title} onChange={handleTitleChange} />
        <br />
        <label htmlFor="year-input">Search by Year:</label>
        <input id="year-input" type="number" value={year} onChange={handleYearChange} />
        <br />
        <button type="submit">Search</button>
      </form>
      {movies.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Year</th>
              <th>IMDb ID</th>
              <th>IMDb Rating</th>
              <th>Rotten Tomatoes Rating</th>
              <th>Metacritic Rating</th>
              <th>Classification</th>
            </tr>
          </thead>
          <tbody>
            {movies.map(movie => (
              <tr key={movie.id}>
                <td>{movie.title}</td>
                <td>{movie.year.slice(0, 4)}</td>
                <td>{movie.imdbID}</td>
                <td>{movie.imdbRating}</td>
                <td>{movie.rottentomatoesRating}</td>
                <td>{movie.metacriticRating}</td>
                <td>{movie.classification}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Loading....</p>
      )}
    </div>
  );
}

export default MoviesPage;
