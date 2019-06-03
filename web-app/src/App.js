import React from 'react';
import { BrowserRouter, Router, Route, Link } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import ThemeStyle from "./style/Theme.less";
import Header from './screen/common/Header';
import ViewPort from './screen/common/ViewPort';
import HomePage from './screen/HomePage';
import Maulik from './screen/Maulik';
import WeddingPlannerSearch from './screen/WeddingPlannerSearch';
import SearchWeddingVenue from './screen/SearchWeddingVenue';
import VenueDetails from './screen/VenueDetails';
import VenueContact from './screen/VenueContact';

const API_HOST="http://localhost:3001"

function App() {
  return (
  	<BrowserRouter basename="/" >      
  	  <Header></Header>
  	  <ViewPort></ViewPort>
      <div>
        <Route path="/" exact={true} component={HomePage} />
        <Route path="/maulik/add/:addid/hello/:helloid" component={Maulik} />
        <Route path="/s/wedding-planner/:location" exact component={WeddingPlannerSearch} />
        <Route path="/s/wedding-venue/:location" exact component={SearchWeddingVenue} />
        <Route path="/venue/:id" exact component={VenueDetails} />
        <Route path="/venue/contact/:id" exact component={VenueContact} />
      </div>
    </BrowserRouter>
  );
}

export default App;
