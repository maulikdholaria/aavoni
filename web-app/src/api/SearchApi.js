class SearchApi {

  searchVenue(callback) {
    fetch("api/search/venue")
    .then(res => res.json())
    .then(callback)
  }

  searchWeddingPlanner(callback) {
    fetch("api/search/wedding-planner")
    .then(res => res.json())
    .then(callback)
  }

}

export default SearchApi;