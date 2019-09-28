const axios = require('axios');

class PhotographersApi {

  create(params, callback) {
    axios.post("api/photographers/create/", params)
    .then(callback)
  }

  get(id, callback) {
    axios.get("api/photographers/get/" + id)
    .then(callback)
  }

  edit(params, callback) {
    axios.post("api/photographers/edit/" + params.id, params)
    .then(callback)
  }

  uploadImages(id, imageFile, callback) {
    axios.post("api/photographers/upload/images/" + id, imageFile)
    .then(callback)
  }

}

export default PhotographersApi;