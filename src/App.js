import './App.css';
import logo from './logo.svg';

import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import MoviesPage from './pages/MoviesPage';
import MoviePage from './pages/MoviePage';
import PersonPage from './pages/PersonPage';
import ProfilePage from './pages/ProfilePage';
import SearchInputs from './components/SearchInputs';

function App() {
  return (
    <BrowserRouter>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/"><img src={logo} alt="Home" width="40" height="40" /></Link>
            </li>
          </ul>
          <SearchInputs />
          <ul>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/movies" element={<MoviesPage />} />
          <Route exact path="/movies/data/:id" element={<MoviePage />} />
          <Route exact path="/people/:id" element={<PersonPage />} />
          <Route exact path="/profile" element={<ProfilePage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;