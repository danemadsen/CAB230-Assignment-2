import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPerson, postRefresh } from '../API';

function PersonPage() {
  const { id } = useParams();

  const [person, setPerson] = React.useState(null);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    async function fetchData() {
      const data = await getPerson(id);
      if (data.error) {
        if (data.error === 'JWT Token expired') {
          const result = await postRefresh();

          if (result.accessToken) localStorage.setItem('accessToken', result.accessToken);
          else setError(result.error || 'Failed to refresh token');

          const refreshedData = await getPerson(id);
          if (refreshedData.error) setError(refreshedData.error);
          else setPerson(refreshedData);
        } 
        else setError(data.error);
      } 
      else setPerson(data);
    }
    fetchData();
  }, [id]);

  if (error) {
    return (
      <div>
        <h1>Error</h1>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Person Details</h1>
      {person ? (
        <div>
          <h2>{person.name}</h2>
          <p>Date of Birth: {person.birthYear}</p>
          <p>Death: {person.deathYear}</p>
          <h3>Roles:</h3>
          <ul>
            {person.roles.map((role, index) => (
              <li key={index}>
                <Link to={`/movies/data/${role.movieId}`}>
                  {role.movieName}
                </Link>{' '}
                as {role.characters.join(', ')} ({role.category})
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default PersonPage;
