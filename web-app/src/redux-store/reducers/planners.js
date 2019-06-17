export default function planners(state = [], action) {
  switch (action.type) {
  	case 'ADD_CURRENT_PLANNER_SEARCH':
      //return state.concat(action.data)
      return {...state, marketCity: action.data.marketCity, totalPlanners: action.data.totalPlanners, planners: action.data.planners}
    default:
      return state
  }
}

