const axios = require('axios');

class SearchApi {

  searchVenue(callback) {
    fetch("api/search/venue")
    .then(res => res.json())
    .then(callback)
  }

  searchWeddingPlanner(callback) {
    axios.get("api/search/wedding-planner")
    .then(callback)
    .catch(function (error) {
      console.log(error);
    });
  }

}

export default SearchApi;