import React from 'react';
import { BrowserRouter, Router, Route, Link } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import ThemeStyle from "./style/Theme.less";
import Header from './screen/common/Header';
import ViewPort from './screen/common/ViewPort';
import HomePage from './screen/HomePage';
import CreateAccount from './screen/CreateAccount';
import Account from './screen/Account';
import Dashboard from './screen/Dashboard';
import ManageCC from './screen/ManageCC';
import WeddingPlannerSearch from './screen/WeddingPlannerSearch';
import WeddingPlannerDetail from './screen/WeddingPlannerDetail';
import PlannerContact from './screen/PlannerContact';
import PlannerEdit from './screen/PlannerEdit';
import PlannerEditImages from './screen/PlannerEditImages';
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
        <Route path="/create-account" exact={true} component={CreateAccount} />
        <Route path="/manage-cc" exact component={ManageCC} />
        <Route path="/account" exact component={Account} />
        <Route path="/dashboard" exact component={Dashboard} />
        <Route path="/s/wedding-planner/:location" exact component={WeddingPlannerSearch} />
        <Route path="/wedding-planner/:id" exact component={WeddingPlannerDetail} />
        <Route path="/planner/contact/:id" exact component={PlannerContact} />
        <Route path="/planner/edit/:id" exact component={PlannerEdit} />
        <Route path="/planner/edit/images/:id" exact component={PlannerEditImages} />
        <Route path="/s/wedding-venue/:location" exact component={SearchWeddingVenue} />
        <Route path="/venue/:id" exact component={VenueDetails} />
        <Route path="/venue/contact/:id" exact component={VenueContact} />
      </div>
    </BrowserRouter>
  );
}

export default App;
