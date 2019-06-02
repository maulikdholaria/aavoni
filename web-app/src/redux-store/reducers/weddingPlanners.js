export default function weddingPlanners(state = [], action) {
  switch (action.type) {
  	case 'ADD_CURRENT_WEDDING_PLANNERS_SEARCH':
      //return state.concat(action.data)
      return {...state, totalPlanners: action.data.totalPlanners, planners: action.data.planners}
    default:
      return state
  }
}

