import { combineReducers } from 'redux';
import weddingPlanners from './weddingPlanners';
import venues from './venues';
import currentVenueDetail from './currentVenueDetail';

export default combineReducers({
  weddingPlanners,
  venues,
  currentVenueDetail
})