export default function venues(state = [], action) {
  switch (action.type) {
  	case 'ACC_CURRENT_SEARCH_VENUES':
      //return state.concat(action.data)
      return {...state, totalVenues: action.data.totalVenues, venues: action.data.venues}
    default:
      return state
  }
}

