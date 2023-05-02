import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchInputs() {
  const [searchTitle, setSearchTitle] = useState('');
  const [searchYear, setSearchYear] = useState('');
  const [shouldNavigate, setShouldNavigate] = useState(false);

  const navigate = useNavigate();

  const handleTitleChange = (event) => {
    setSearchTitle(event.target.value);
    setShouldNavigate(true);
  };

  const handleYearChange = (event) => {
    setSearchYear(event.target.value);
    setShouldNavigate(true);
  };

  useEffect(() => {
    if (shouldNavigate) {
      navigate(`/movies?title=${searchTitle}&year=${searchYear}`);
      setShouldNavigate(false);
    }
  }, [searchTitle, searchYear, navigate, shouldNavigate]);

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
