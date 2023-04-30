const API_ADDRESS = 'http://sefdb02.qut.edu.au:3000';

export const GET_Movies = async (year, title, page = 1) => {
  try {
    const response = await fetch(`${API_ADDRESS}/movies/search?year=${year}&title=${title}&page=${page}`);
    
    if (response.status === 429) {
      throw new Error('Too many requests, please try again later.');
    }

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    console.log(data); // log the response data to see what's returned
    return data; // Return the whole data object to access pagination data as well
  } catch (error) {
    console.error(error);
    return { data: [], pagination: {}, error: error.message };
  }
};

export const GET_Movie = async (id) => {
  try {
    const response = await fetch(`${API_ADDRESS}/movies/data/${id}`);
    
    if (response.status === 429) {
      throw new Error('Too many requests, please try again later.');
    }

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    console.log(data); // log the response data to see what's returned
    return data;
  } catch (error) {
    console.error(error);
    return { error: error.message };
  }
};

export const GET_Person = async (id) => {
  try {
    const response = await fetch(`${API_ADDRESS}/people/${id}`);
    
    if (response.status === 429) {
      throw new Error('Too many requests, please try again later.');
    }

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    console.log(data); // log the response data to see what's returned
    return data;
  } catch (error) {
    console.error(error);
    return { error: error.message };
  }
};


export const POST_Register = async (email, password) => {
  try {
    const response = await fetch(`${API_ADDRESS}/user/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.status === 429) {
      throw new Error('Too many requests, please try again later.');
    }

    const data = await response.json();

    if (response.ok) {
      return { success: true, message: data.message };
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    console.error(error);
    return { success: false, message: error.message };
  }
};

