import { combineReducers } from 'redux';
import planners from './planners';
import currentPlannerDetail from './currentPlannerDetail';
import venues from './venues';
import currentVenueDetail from './currentVenueDetail';

export default combineReducers({
  planners,
  venues,
  currentPlannerDetail,
  currentVenueDetail
})