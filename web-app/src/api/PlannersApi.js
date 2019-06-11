const axios = require('axios');

class PlannersApi {

  get(id, callback) {
    axios.get("api/planners/get/" + id)
    .then(callback)
  }

  edit(params, callback) {
    axios.post("api/planners/edit/" + params.id, params)
    .then(callback)
  }

  uploadImages(id, imageFile, callback) {
    axios.post("api/planners/upload/images/" + id, imageFile)
    .then(callback)
  }

}

export default PlannersApi;