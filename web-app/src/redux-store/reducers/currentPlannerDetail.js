export default function currentPlannerDetail(state = [], action) {
  switch (action.type) {
  	case 'ADD_CURRENT_PLANNER_DETAIL':
      //return state.concat(action.data)
      return {...state, 
        id: action.data.id,
        about: action.data.about,
        address: action.data.address,
        city: action.data.city,
        images: action.data.images,
        lat: action.data.lat,
        lng: action.data.lng,
        name: action.data.name,
        priceRange: action.data.priceRange,
        fb: action.data.fb,
        instagram: action.data.instagram,
        pinterest: action.data.pinterest,
        website: action.data.website,
        marketCity: action.data.marketCity,
        } 
    default:
      return state
  }
}

