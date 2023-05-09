import React, { useEffect, useState, useRef, useCallback } from 'react';
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
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [page, setPage] = useState(1);

  const searchParams = new URLSearchParams(location.search);
  const title = useDebounce(searchParams.get('title') || '', 1000);
  const year = useDebounce(searchParams.get('year') || '', 1000);

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    setMovies([]);
    setPage(1);
  }, [year, title]);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const { data } = await getMovies(year, title, page);
        setMovies((prevMovies) => [...prevMovies, ...data]);
        setHasMore(data.length > 0);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchMovies();
  }, [year, title, page]);

  const observer = useRef();
  const lastMovieElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const handleMovieClick = (movieID) => {
    navigate(`/movies/data/${movieID}`);
  };

  return (
    <div className="movies-page">
      <div className="movie-grid">
        {movies.map((movie, index) => {
          if (movies.length === index + 1) {
            return (
              <div ref={lastMovieElementRef} key={movie.imdbID}>
                <MovieCell
                  movie={movie}
                  onClick={() => handleMovieClick(movie.imdbID)}
                />
              </div>
            );
          } else {
            return (
              <MovieCell
                key={movie.imdbID}
                movie={movie}
                onClick={() => handleMovieClick(movie.imdbID)}
              />
            );
          }
        })}
      </div>
      <div>{loading && 'Loading...'}</div>
    </div>
  );
}

export default MoviesPage;
