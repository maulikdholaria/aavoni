export default function loggedInUser(state = [], action) {
  switch (action.type) {
  	case 'ADD_CURRENT_LOGGEDIN_USER':
      return {...state, 
        id: action.data.id,
        fname: action.data.fname,
        lname: action.data.lname,
        email: action.data.email} 
    default:
      return state
  }
}

