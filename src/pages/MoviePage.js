import React from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovie } from '../API';
import '../App.css';

function MoviePage() {
  const { id } = useParams();
  const [movie, setMovie] = React.useState(null);
  
  React.useEffect(() => {
    fetchMovie(id)
      .then(results => setMovie(results))
      .catch(error => console.log(error));
  }, [id]);

  return (
    <div className="movie-page">
      {movie ? (
        <div>
          <img src={movie.poster} alt={`${movie.title} poster`} />
          <h1>{movie.title}</h1>
          <p>Year: {movie.year}</p>
          <p>IMDb Rating: {movie.ratings.find(rating => rating.source === "Internet Movie Database")?.value}</p>
          <p>Box Office: ${movie.boxoffice.toLocaleString()}</p>
          <p>Runtime: {movie.runtime} minutes</p>
          <p>Genres: {movie.genres.join(', ')}</p>
          <p>Country: {movie.country}</p>
          <p>Plot: {movie.plot}</p>
          <h2>Principals:</h2>
          <ul>
            {movie.principals.map(principal => (
              <li key={principal.id}>
                {principal.name} ({principal.category})
                {principal.characters.length > 0 ? ` - ${principal.characters.join(', ')}` : ''}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default MoviePage;
