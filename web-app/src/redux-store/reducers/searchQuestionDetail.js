export default function searchQuestionDetail(state = [], action) {
  switch (action.type) {
  	case 'ADD_SEARCH_QUESTION_DETAIL':
      return {...state, 
        id: action.data.id,
        phone: action.data.phone,
        fname: action.data.fname,
        lname: action.data.lname,
        email: action.data.email,
        guests: action.data.guests,
        budget: action.data.budget,
        date: action.data.date,
        city: action.data.city,
        state: action.data.state,
        country: action.data.country,
        message: action.data.message,
        forCountry: action.data.forCountry
      } 
    default:
      return state
  }
}

