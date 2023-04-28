import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function MoviePage() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMovie() {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
          params: {
            api_key: 'your_api_key_here',
            language: 'en-US',
          },
        });

        setMovie(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    }

    fetchMovie();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{movie.title}</h1>
      <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
      <p>{movie.overview}</p>
      <p>Released: {movie.release_date}</p>
      <p>Runtime: {movie.runtime} minutes</p>
    </div>
  );
}

export default MoviePage;
