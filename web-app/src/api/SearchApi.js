class SearchApi {

  searchVenue(callback) {
    fetch("api/search/venue")
    .then(res => res.json())
    .then(callback)
  }

}

export default SearchApi;