export default function currentVenueDetail(state = [], action) {
  switch (action.type) {
    case 'ADD_CURRENT_VENUE_DETAIL':
      return {...state, 
      		 id: action.data.id,
      		 about: action.data.about,
      		 address: action.data.address,
			 images: action.data.images,
			 lat: action.data.lat,
			 lng: action.data.lng,
			 name: action.data.name,
			 pricerange: action.data.pricerange,
			 ratings: action.data.ratings,
			 type: action.data.type,
			 wedding: action.data.wedding}
			 
    default:
      return state
  }
}

