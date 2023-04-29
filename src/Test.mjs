import { fetchMovies } from './API.js';

function testFetchMovies() {
  const movies = fetchMovies("1996", "");
  console.log(movies);
}

testFetchMovies();