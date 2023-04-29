import React from 'react';
import { fetchMovie } from '../API';

function MoviePage(imdbID) {
  const [movie, setMovie] = React.useState(null);

  React.useEffect(() => {
    fetchMovie(imdbID)
      .then(results => setMovie(results))
      .catch(error => console.log(error));
  }, [imdbID]);

  return (
    <div>
      <h1>Movie Details</h1>
      {movie ? (
        <div>
          <h2>{movie.title}</h2>
          <p>{movie.year.slice(0, 4)}</p>
          <p>{movie.imdbID}</p>
          <p>{movie.imdbRating}</p>
          <p>{movie.rottenTomatoesRating}</p>
          <p>{movie.metacriticRating}</p>
          <p>{movie.classification}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default MoviePage;