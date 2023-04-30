const API_ADDRESS = 'http://sefdb02.qut.edu.au:3000';

export const fetchMovies = async (year, title, page = 1) => {
  try {
    const response = await fetch(`${API_ADDRESS}/movies/search?year=${year}&title=${title}&page=${page}`);
    const data = await response.json();
    console.log(data); // log the response data to see what's returned
    return data; // Return the whole data object to access pagination data as well
  } catch (error) {
    console.error(error);
    return { data: [], pagination: {} };
  }
};

export const fetchMovie = async (id) => {
  try {
    const response = await fetch(`${API_ADDRESS}/movies/data/${id}`);
    const data = await response.json();
    console.log(data); // log the response data to see what's returned
    return data.results;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const fetchPerson = async (id) => {
  try {
    const response = await fetch(`${API_ADDRESS}/people/data/${id}`);
    const data = await response.json();
    console.log(data); // log the response data to see what's returned
    return data.results;
  } catch (error) {
    console.error(error);
    return null;
  }
}
