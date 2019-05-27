import React from 'react';
import { BrowserRouter, Router, Route, Link } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import ThemeStyle from "./style/Theme.less";
import Header from './screen/common/Header';
import ViewPort from './screen/common/ViewPort';
import HomePage from './screen/HomePage';
import Maulik from './screen/Maulik';
import SearchVenue from './screen/SearchVenue';

const API_HOST="http://localhost:3001"

function App() {
  return (
  	<BrowserRouter basename="/" >      
  	  <Header></Header>
  	  <ViewPort></ViewPort>
      <div>
        <Route path="/" exact={true} component={HomePage} />
        <Route path="/maulik/add/:addid/hello/:helloid" component={Maulik} />
        <Route path="/search/venue" exact component={SearchVenue} />
      </div>
    </BrowserRouter>
  );
}

export default App;
