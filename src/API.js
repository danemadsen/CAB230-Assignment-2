const API_ADDRESS = 'http://sefdb02.qut.edu.au:3000';

// Used to check if the response contains an error and handle it accordingly
async function checkError(response) {
  if (response.status === 429) throw new Error('429 - Too many requests, please try again later.');
  const data = await response.json();
  if (!response.ok) throw new Error(response.status + ' - ' + data.message);
  return data;
}

async function getMovies(year, title, page = 1){
  try {
    return await checkError(await fetch(`${API_ADDRESS}/movies/search?year=${year}&title=${title}&page=${page}`));
  } 
  catch (error) {
    console.error(error);
    return { error: error.message };
  }
};

async function getMovie(id){
  try {
    return await checkError(await fetch(`${API_ADDRESS}/movies/data/${id}`));
  } 
  catch (error) {
    console.error(error);
    return { error: error.message };
  }
};

async function getPerson(id){
  try {
    const accessToken = localStorage.getItem('accessToken');
    
    const response = await fetch(`${API_ADDRESS}/people/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
    });
    return await checkError(response);
  } 
  catch (error) {
    console.error(error);
    return { error: error.message };
  }
};

async function postRegister(email, password){
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

async function postLogin(email, password, longExpiry = false){
  try {
    const response = await fetch(`${API_ADDRESS}/user/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, longExpiry }),
    });
    const data = await checkError(response);
    localStorage.setItem('accessToken', data.bearerToken.token);
    localStorage.setItem('refreshToken', data.refreshToken.token);
    return { success: true };
  } 
  catch (error) {
    console.error(error);
    return { success: false, message: error.message };
  }
};

async function postRefresh(){
  try {
    const refreshToken = await localStorage.getItem('refreshToken');

    if (!refreshToken) throw new Error('Refresh token not found');

    const response = await fetch(`${API_ADDRESS}/user/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${refreshToken}`,
      },
      body: JSON.stringify({ refreshToken }),
    });
    const data = await checkError(response);
    localStorage.setItem('accessToken', data.bearerToken.token);
    localStorage.setItem('refreshToken', data.refreshToken.token);
    return { success: true };
  } 
  catch (error) {
    console.error(error);
    return { success: false, message: error.message };
  }
};


async function postLogout(){
  try {
    const refreshToken = localStorage.getItem('refreshToken');

    const response = await fetch(`${API_ADDRESS}/user/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${refreshToken}`,
      },
      body: JSON.stringify({ refreshToken }),
    });
    const data = await checkError(response);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    return { success: true, message: data.message };
  } 
  catch (error) {
    console.error(error);
    return { success: false, message: error.message };
  }
};

export { getMovies, getMovie, getPerson, postRegister, postLogin, postRefresh, postLogout };