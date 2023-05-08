import React, { useEffect, useState } from 'react';
import { getMovies, getMovie } from '../API';
import { Carousel } from 'react-responsive-carousel';
import { useNavigate } from 'react-router-dom';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './LandingPage.css';

function LandingPage() {
  const [topMovies, setTopMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTopMovies = async () => {
      try {
        const { data } = await getMovies('', '', 1);

        const sortedMovies = data.sort(
          (a, b) => parseFloat(b.imdbRating) - parseFloat(a.imdbRating)
        );

        const topSixMovies = sortedMovies.slice(0, 10);

        const fetchMoviesWithPoster = topSixMovies.map(async (movie) => {
          const movieDetails = await getMovie(movie.imdbID);
          return { ...movie, ...movieDetails }; // Combine list movie and individual movie objects
        });

        Promise.all(fetchMoviesWithPoster).then((moviesWithPoster) => {
          setTopMovies(moviesWithPoster);
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchTopMovies();
  }, []);

  const handleMovieClick = (movieID) => {
    navigate(`/movies/data/${movieID}`);
  };

  return (
    <div>
      <h1>University Movie Data Base</h1>
      <p>
        An app for searching movies to fulfill all your University needs.
      </p>
      {topMovies.length > 0 && (
        <Carousel
          showThumbs={false}
          infiniteLoop
          autoPlay
          showStatus={false}
          centerMode
          centerSlidePercentage={50}
          emulateTouch
          onClickItem={(index) => handleMovieClick(topMovies[index].imdbID)}
        >
          {topMovies.map((movie) => (
            <div className="carousel-slide" key={movie.imdbID}>
              <img className="poster-image" src={movie.poster} alt={movie.title} />
              <p className="legend">{movie.title}</p>
            </div>
          ))}
        </Carousel>
      )}
    </div>
  );
}

export default LandingPage;
