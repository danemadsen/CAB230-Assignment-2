import './App.css';
import logo from './logo.svg';

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import MoviesPage from './pages/MoviesPage';
import MoviePage from './pages/MoviePage';
import PersonPage from './pages/PersonPage';
import ProfilePage from './pages/ProfilePage';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/"><img src={logo} alt="Home" width="40" height="40" /></Link>
            </li>
            <li>
              <Link to="/movies">Movies</Link>
            </li>
            <li>
              <Link to="/userprofile">Profile</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route exact path="/" element={<LandingPage/>}/>
          <Route exact path="/movies" element={<MoviesPage/>}/>
          <Route exact path="/movies/data/:id" element={<MoviePage/>}/>
          <Route exact path="/people/:id" element={<PersonPage/>}/>
          <Route exact path="/userprofile" element={<ProfilePage/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
