import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { getMovie } from '../components/API';
import '../styles/MoviePage.css'

function MoviePage() {
  const { id } = useParams();
  const [movie, setMovie] = React.useState(null);
  
  React.useEffect(() => {
    getMovie(id)
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
          <p>Box Office: ${movie.boxoffice.toLocaleString()}</p>
          <p>Runtime: {movie.runtime} minutes</p>
          <p>Genres: {movie.genres.join(', ')}</p>
          <p>Country: {movie.country}</p>
          <h2>Plot: </h2>
          <p>{movie.plot}</p>
          <h2>Cast:</h2>
          <ul>
            {movie.principals.map(principal => (
              <li key={principal.id}>
                <Link to={`/people/${principal.id}`}>
                  {principal.name}
                </Link>
                ({principal.category})
                {principal.characters.length > 0 ? ` - ${principal.characters.join(', ')}` : ''}
              </li>
            ))}
          </ul>
          <h2>Ratings:</h2>
          <ul>
            {movie.ratings.map(rating => (
              <li key={rating.source}>
                {rating.source}: {rating.value}
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