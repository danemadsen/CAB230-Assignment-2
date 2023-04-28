import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LandingPage from './pages/LandingPage.js';
import MoviesPage from './pages/MoviesPage.js';
import MoviePage from './pages/MoviePage.js';
import PersonPage from './pages/PersonPage.js';
import ProfilePage from './pages/ProfilePage.js';


function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/movies">Movies</Link>
            </li>
            <li>
              <Link to="/userprofile">User Profile</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/movies" element={<MoviesPage />} />
          <Route exact path="/movies/:id" element={<MoviePage />} />
          <Route exact path="/people/:id" element={<PersonPage />} />
          <Route exact path="/userprofile" element={<ProfilePage />} />
        </Routes>
      </div>
    </Router>
  );
}


export default App;
