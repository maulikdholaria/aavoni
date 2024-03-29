import React from 'react';
import { BrowserRouter, Router, Route, Link } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import ThemeStyle from './style/Theme.less';
import Header from './screen/common/Header';
import ViewPort from './screen/common/ViewPort';
import HomePage from './screen/HomePage';
import CreateAccount from './screen/CreateAccount';
import Account from './screen/Account';
import Dashboard from './screen/Dashboard';
import SearchQuestions from './screen/SearchQuestions';
import SearchQuestionsConfirmation from './screen/SearchQuestionsConfirmation';
import ManageCC from './screen/ManageCC';
import WeddingPlannerSearch from './screen/WeddingPlannerSearch';
import WeddingPlannerDetail from './screen/WeddingPlannerDetail';
import PlannerContact from './screen/PlannerContact';
import PlannerEdit from './screen/PlannerEdit';
import PlannerEditImages from './screen/PlannerEditImages';
import PhotographerEdit from './screen/PhotographerEdit';
import SearchWeddingVenue from './screen/SearchWeddingVenue';
import VenueDetails from './screen/VenueDetails';
import VenueContact from './screen/VenueContact';
import SearchQuestionDetail from './screen/SearchQuestionDetail';
import LeadPurchasePage from './screen/LeadPurchasePage';
import TermsConditions from './screen/TermsConditions';
import PrivacyPolicy from './screen/PrivacyPolicy';
import LeadPurchaseHowItWorks from './screen/LeadPurchaseHowItWorks';

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
        <Route path="/search-questions/:country" exact component={SearchQuestions} />
        <Route path="/search-questions-confirmation" exact component={SearchQuestionsConfirmation} />
        <Route path="/s/wedding-planner/:marketCity" exact component={WeddingPlannerSearch} />
        <Route path="/wedding-planner/:id" exact component={WeddingPlannerDetail} />
        <Route path="/planner/contact/:id" exact component={PlannerContact} />
        <Route path="/planner/edit/:id" exact component={PlannerEdit} />
        <Route path="/planner/edit/images/:id" exact component={PlannerEditImages} />
        <Route path="/photographer/edit/:id" exact component={PhotographerEdit} />
        <Route path="/s/wedding-venue/:marketCity" exact component={SearchWeddingVenue} />
        <Route path="/venue/:id" exact component={VenueDetails} />
        <Route path="/venue/contact/:id" exact component={VenueContact} />
        <Route path="/search-question-detail/:id" exact component={SearchQuestionDetail} />
        <Route path="/planner-lead-purchase/:uuid" exact component={LeadPurchasePage} />
        <Route path="/photographer-lead-purchase/:uuid" exact component={LeadPurchasePage} />
        <Route path="/terms-conditions" exact component={TermsConditions} />
        <Route path="/privacy-policy" exact component={PrivacyPolicy} />
        <Route path="/lead-purchase-how-it-works" exact component={LeadPurchaseHowItWorks} />
      </div>
    </BrowserRouter>
  );
}

export default App;
