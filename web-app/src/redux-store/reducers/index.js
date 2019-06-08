import { combineReducers } from 'redux';
import planners from './planners';
import currentPlannerDetail from './currentPlannerDetail';
import venues from './venues';
import currentVenueDetail from './currentVenueDetail';
import currentPlannerLead from './currentPlannerLead';

export default combineReducers({
  planners,
  venues,
  currentPlannerDetail,
  currentVenueDetail,
  currentPlannerLead
})