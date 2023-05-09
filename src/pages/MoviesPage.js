import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { getMovies } from '../API';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import '../App.css';

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

  const [gridApi, setGridApi] = useState(null);

  const handleMovieRowClick = (event) => {
    navigate(`/movies/data/${event.data.imdbID}`);
  };

  const columnDefs = [
    { headerName: 'Title', field: 'title', sortable: true, flex: 1, cellStyle: { textAlign: 'center' } },
    { headerName: 'Year', field: 'year', sortable: true, flex: 1, cellStyle: { textAlign: 'center' } },
    { headerName: 'IMDb Rating', field: 'imdbRating', sortable: true, flex: 1, cellStyle: { textAlign: 'center' } },
    { headerName: 'Rotten Tomatoes Rating', field: 'rottenTomatoesRating', sortable: true, flex: 1, cellStyle: { textAlign: 'center' } },
    { headerName: 'Metacritic Rating', field: 'metacriticRating', sortable: true, flex: 1, cellStyle: { textAlign: 'center' } },
    { headerName: 'Classification', field: 'classification', sortable: true, flex: 1, cellStyle: { textAlign: 'center' } },
  ];  

  useEffect(() => {
    if (gridApi) {
      gridApi.setDatasource({
        getRows: function (params) {
          getMovies(year, title, params.startRow / 50 + 1)
            .then(({ data }) => {
              params.successCallback(data, data.length < 50 ? params.startRow + data.length : -1);
            })
            .catch((error) => {
              console.log(error);
            });
        },
      });
    }
  }, [gridApi, year, title]);

  const onGridReady = params => {
    setGridApi(params.api);
  };

  return (
    <div className="movies-page">
      <div className="ag-theme-alpine" style={{ flex: 1 }}>
        <AgGridReact
            onGridReady={onGridReady}
            columnDefs={columnDefs}
            onRowClicked={handleMovieRowClick}
            rowSelection='single'
            rowModelType='infinite'
            paginationPageSize={50}
            cacheBlockSize={50}
            rowHeight={50}
          />
        </div>
      </div>
    );  
  }
  
  export default MoviesPage;
  