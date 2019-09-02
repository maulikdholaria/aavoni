const axios = require('axios');

class SearchQuestionsApi {

  create(params, callback) {
    axios.post("api/leads/search-questions/create", params)
    .then(callback)
  }

}

export default SearchQuestionsApi;