import React from 'react';
import axios from 'axios';

function MoviesPage() {
  const [movies, setMovies] = React.useState([]);

  React.useEffect(() => {
    axios.get('http://sefdb02.qut.edu.au:3000/movies?year=1996')
      .then(response => setMovies(response.data))
      .catch(error => console.log(error));
  }, []);

  return (
    <div>
      <h1>Popular Movies</h1>
      <ul>
        {movies.map(movie => (
          <li key={movie.id}>
            <a href={`/movies/${movie.id}`}>
              {movie.title} ({movie.release_date.slice(0, 4)})
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MoviesPage;
