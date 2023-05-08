import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getMovies } from '../API';
import { MovieCell } from '../components/MovieCell';
import './MoviesPage.css';

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

function MoviesPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(location.search);
  const title = useDebounce(searchParams.get('title') || '', 1000);
  const year = useDebounce(searchParams.get('year') || '', 1000);

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const { data } = await getMovies(year, title, 1);
        setMovies(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMovies();
  }, [year, title]);

  const handleMovieClick = (movieID) => {
    navigate(`/movies/data/${movieID}`);
  };

  return (
    <div className="movies-page">
      <div className="movie-grid">
        {movies.map((movie) => (
          <MovieCell
            key={movie.imdbID}
            movie={movie}
            onClick={() => handleMovieClick(movie.imdbID)}
          />
        ))}
      </div>
    </div>
  );
}

export default MoviesPage;
