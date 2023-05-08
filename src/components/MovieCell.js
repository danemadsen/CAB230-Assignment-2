import React from 'react';
import './MovieCell.css';

export function MovieCell({ movie, onClick }) {
  return (
    <div className="movie-cell" onClick={onClick}>
      {movie && (
        <>
          <div className="movie-info">
            <p className="movie-title">{movie.title}</p>
            <p>{movie.year}</p>
            <p>IMDb Rating: {movie.imdbRating}</p>
            <p>Rotten Tomatoes Rating: {movie.rottenTomatoRating}</p>
            <p>Metacritic Rating: {movie.metacriticRating}</p>
            <p>Classification: {movie.classification}</p>
          </div>
        </>
      )}
    </div>
  );
}
