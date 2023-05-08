import React, { useState } from 'react';
import { InView } from 'react-intersection-observer';
import { getCombinedMovie } from '../API';

export function MovieCell({ movie, onClick }) {
  const [movieData, setMovieData] = useState(null);

  const handleInView = async (inView) => {
    if (inView && !movieData) {
      const combinedMovie = await getCombinedMovie(movie);
      setMovieData(combinedMovie);
    }
  };

  return (
    <InView triggerOnce onChange={handleInView}>
      {({ ref }) => (
        <div className="movie-cell" onClick={onClick} ref={ref}>
          {movieData && (
            <>
              <img className="movie-poster" src={movieData.poster} alt={movieData.title} />
              <div className="movie-info">
                <p className="movie-title">{movieData.title}</p>
                <p className="movie-year">{movieData.year}</p>
              </div>
            </>
          )}
        </div>
      )}
    </InView>
  );
}
