class VenueApi {

  getVenue(id, callback) {
    fetch("api/venue/" + id)
    .then(res => res.json())
    .then(callback)
  }

}

export default VenueApi;