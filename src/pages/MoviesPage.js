import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { AgGridReact } from 'ag-grid-react';
import { useNavigate } from 'react-router-dom';
import { getMovies } from '../API';

function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [gridApi, setGridApi] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const title = searchParams.get('title');
  const year = searchParams.get('year');

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await getMovies(title, year);
      setMovies(response.data);
    };
    fetchMovies();
  }, [title, year]);

  const onGridReady = (params) => {
    setGridApi(params.api);
  };

  const onRowClicked = (params) => {
    const movieId = params.data.id;
    navigate(`/movies/data/${movieId}`);
  };

  const onGridSizeChanged = () => {
    gridApi.sizeColumnsToFit();
  };

  const columnDefs = [
    { field: 'title', headerName: 'Title', minWidth: 200, flex: 1 },
    { field: 'release_date', headerName: 'Release Date', minWidth: 150, flex: 1 },
    { field: 'vote_average', headerName: 'Rating', minWidth: 100, flex: 1 },
  ];

  return (
    <div className="movies-page">
      <h1>Movies</h1>
      <div className="ag-theme-custom">
        <AgGridReact
          rowData={movies}
          onGridReady={onGridReady}
          onRowClicked={onRowClicked}
          onGridSizeChanged={onGridSizeChanged}
          rowModelType="infinite"
          pagination={true}
          paginationPageSize={50}
          cacheBlockSize={50}
          columnDefs={columnDefs}
        ></AgGridReact>
      </div>
    </div>
  );
}

export default MoviesPage;
