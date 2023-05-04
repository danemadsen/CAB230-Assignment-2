import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { getMovies } from '../API';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

function MoviesPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(location.search);
  const title = useDebounce(searchParams.get('title') || '', 500);
  const year = useDebounce(searchParams.get('year') || '', 500);

  const handleMovieRowClick = (event) => {
    navigate(`/movies/data/${event.data.imdbID}`);
  };

  const columnDefs = [
    { headerName: 'Title', field: 'title', sortable: true },
    { headerName: 'Year', field: 'year', sortable: true },
    { headerName: 'IMDb Rating', field: 'imdbRating', sortable: true },
    { headerName: 'Rotten Tomatoes Rating', field: 'rottenTomatoesRating', sortable: true },
    { headerName: 'Metacritic Rating', field: 'metacriticRating', sortable: true },
    { headerName: 'Classification', field: 'classification', sortable: true },
  ];

  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    getMovies(year, title, 1)
      .then(({ data }) => {
        setRowData(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [year, title]);

  const gridOptions = {
    columnDefs: columnDefs,
    onRowClicked: handleMovieRowClick,
    rowSelection: 'single',
    rowData: rowData,
  };

  return (
    <div className="movies-page" style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div
        className="ag-theme-alpine"
        style={{
          flex: 1,
          width: '100%',
        }}
      >
        <AgGridReact {...gridOptions} />
      </div>
    </div>
  );
}

export default MoviesPage;
