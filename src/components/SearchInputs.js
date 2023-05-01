import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchInputs() {
  const [searchTitle, setSearchTitle] = useState('');
  const [searchYear, setSearchYear] = useState('');

  const navigate = useNavigate();

  const handleTitleChange = (event) => setSearchTitle(event.target.value);

  const handleYearChange = (event) => setSearchYear(event.target.value);

  useEffect(() => {
    if (searchTitle || searchYear) navigate(`/movies?title=${searchTitle}&year=${searchYear}`);
  }, [searchTitle, searchYear, navigate]);

  return (
    <div className="search-inputs">
      <input
        id="title-input"
        type="text"
        placeholder="Search by title"
        value={searchTitle}
        onChange={handleTitleChange}
      />
      <input
        id="year-input"
        type="text"
        placeholder="Search by year"
        value={searchYear}
        onChange={handleYearChange}
      />
    </div>
  );
}

export default SearchInputs;
