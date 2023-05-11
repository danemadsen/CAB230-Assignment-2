import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPerson, postRefresh } from '../components/API';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import '../styles/PersonPage.css';

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

  const handleMovieRowClick = (event) => {
    navigate(`/movies/data/${event.data.movieId}`); // assuming movieId is the correct field for movie id
  };

  const columnDefs = [
    { headerName: 'Movie Name', field: 'movieName', sortable: true, flex: 1 },
    { headerName: 'Character', field: 'characters', sortable: true, flex: 1, valueGetter: (params) => params.data.characters.join(', ') },
    { headerName: 'IMDb Rating', field: 'imdbRating', sortable: true, flex: 1 },
  ];

  const rowData = person ? person.roles : [];

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
          <div className="ag-theme-alpine" style={{ height: 400, width: '100%' }}>
            <AgGridReact
              columnDefs={columnDefs}
              rowData={rowData}
              onRowClicked={handleMovieRowClick} // add this line
            />
          </div>
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
