export default function currentPlannerLead(state = [], action) {
  switch (action.type) {
  	case 'ADD_CURRENT_PLANNER_LEAD':
      //return state.concat(action.data)
      console.log(action);
      return {...state, 
        budget: action.data.budget,
        date: action.data.date,
        email: action.data.email,
        fname: action.data.fname,
        guests: action.data.guests,
        lname: action.data.lname,
        message: action.data.message,
        phone: action.data.phone} 
    default:
      return state
  }
}
