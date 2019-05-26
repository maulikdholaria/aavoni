import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import HomePage from './screen/HomePage';
import Search from './screen/Search';

const API_HOST="http://localhost:3001"

function App() {
  return (
    <Router>
      <div>
        <Route path="/" exact component={HomePage} />
        <Route path="/search" component={Search} />
      </div>
    </Router>
  );
}

export default App;
