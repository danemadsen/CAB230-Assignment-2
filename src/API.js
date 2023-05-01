const API_ADDRESS = 'http://sefdb02.qut.edu.au:3000';

async function checkError(response) {
  if (response.status === 429) throw new Error('Too many requests, please try again later.');

  const data = await response.json();
  if (!response.ok) throw new Error(data.message);

  console.log(data);
  return data;
}

export const getMovies = async (year, title, page = 1) => {
  try {
    return await checkError(await fetch(`${API_ADDRESS}/movies/search?year=${year}&title=${title}&page=${page}`));
  } 
  catch (error) {
    console.error(error);
    return { data: [], pagination: {}, error: error.message };
  }
};

export const getMovie = async (id) => {
  try {
    return await checkError(await fetch(`${API_ADDRESS}/movies/data/${id}`));
  } 
  catch (error) {
    console.error(error);
    return { error: error.message };
  }
};

export const getPerson = async (id) => {
  try {
    return await checkError(await fetch(`${API_ADDRESS}/people/${id}`));
  } 
  catch (error) {
    console.error(error);
    return { error: error.message };
  }
};


export const postRegister = async (email, password) => {
  try {
    const response = await fetch(`${API_ADDRESS}/user/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await checkError(response);
    return { success: true, message: data.message }; 
  } 
  catch (error) {
    console.error(error);
    return { success: false, message: error.message };
  }
};

export const postLogin = async (email, password, longExpiry = false) => {
  try {
    const response = await fetch(`${API_ADDRESS}/user/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, longExpiry }),
    });
    const data = await checkError(response);
    return { success: true, bearerToken: data.bearerToken, refreshToken: data.refreshToken };
  } 
  catch (error) {
    console.error(error);
    return { success: false, message: error.message };
  }
};

export const postRefresh = async () => {
  try {
    const refreshToken = localStorage.getItem('refreshToken');

    const response = await fetch(`${API_ADDRESS}/user/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken }),
    });
    const data = await checkError(response);
    return { success: true, bearerToken: data.bearerToken, refreshToken: data.refreshToken };
  } 
  catch (error) {
    console.error(error);
    return { success: false, message: error.message };
  }
};

export const postLogout = async () => {
  try {
    const refreshToken = localStorage.getItem('refreshToken');

    const response = await fetch(`${API_ADDRESS}/user/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken }),
    });
    const data = await checkError(response);
    return { success: true, message: data.message };
  } 
  catch (error) {
    console.error(error);
    return { success: false, message: error.message };
  }
};
