import { combineReducers } from 'redux';
import venues from './venues';
import currentVenueDetail from './currentVenueDetail';

export default combineReducers({
  venues,
  currentVenueDetail
})