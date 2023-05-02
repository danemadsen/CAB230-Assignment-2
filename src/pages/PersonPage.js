import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getPerson, postRefresh } from '../API';

function PersonPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [person, setPerson] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [showPopup, setShowPopup] = React.useState(false);

  React.useEffect(() => {
    let tryCount = 0;
    async function fetchData() {
      const data = await getPerson(id);
      if (data.error) {
        if (data.error.includes('401')) {
          tryCount++;
          if (tryCount < 3) {
            postRefresh();
            fetchData();
          } 
          else setShowPopup(true);
        } 
        else setError(data.error);
      } 
      else setPerson(data);
    }
    fetchData();
  }, [id, navigate]);

  const handlePopupOk = () => {
    setShowPopup(false);
    navigate('/profile');
  };

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
      {showPopup && (
        <div className="popup">
          <div className="popup-inner">
            <p>You must be a logged in user to view the pages of cast members.</p>
            <button onClick={handlePopupOk}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PersonPage;
