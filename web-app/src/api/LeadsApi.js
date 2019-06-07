const axios = require('axios');

class LeadsApi {

  plannerLeadCreate(params, callback) {
    axios.post('api/leads/planner/create', params)
    .then(callback)
    .catch(function (error) {
      console.log(error);
    });
  }

}

export default LeadsApi;