import React from 'react';
import { BrowserRouter, Router, Route, Link } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import Header from './screen/common/Header';
import HomePage from './screen/HomePage';
import Maulik from './screen/Maulik';
import Search from './screen/Search';

const API_HOST="http://localhost:3001"

function App() {
  return (
  	<BrowserRouter basename="/" >
      <Header></Header>
      <div>
        <Route path="/" exact={true} component={HomePage} />
        <Route path="/maulik/add/:addid/hello/:helloid" component={Maulik} />
        <Route path="/search" exact component={Search} />
      </div>
    </BrowserRouter>
  );
}

export default App;
