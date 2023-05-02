import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { getMovies } from '../API';

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
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = React.useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(location.search);
  const title = useDebounce(searchParams.get('title') || '', 500);
  const year = useDebounce(searchParams.get('year') || '', 500);

  useEffect(() => {
    getMovies(year, title, page)
    .then(({ data, pagination }) => {
      setMovies(data);
      setTotalPages(pagination.lastPage);
    })
    .catch(error => console.log(error));
  }, [year, title, page]);

  const handleMovieRowClick = (imdbID) => {
    navigate(`/movies/data/${imdbID}`);
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  return (
    <div className="movies-page">
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
              <tr key={movie.id} onClick={() => handleMovieRowClick(movie.imdbID)}>
                <td>{movie.title}</td>
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
        <button className="prev-button" onClick={handlePrevPage} disabled={page === 1}>
          Prev
        </button>
        <span>
          {page} / {totalPages}
        </span>
        <button className="next-button" onClick={handleNextPage} disabled={page === totalPages}>
          Next
        </button>
      </div>
    </div>
  );  
}

export default MoviesPage;
