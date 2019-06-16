const axios = require('axios');

class UsersApi {

  create(params, callback) {
    axios.post('api/users/create', params)
    .then(callback)
    .catch(function (error) {
      console.log(error);
    });
  }

  edit(params, callback) {
    axios.post('api/users/edit', params)
    .then(callback)
    .catch(function (error) {
      console.log(error);
    });
  }

  editStripeSource(params, callback) {
    axios.post('api/users/edit/stripe-source', params)
    .then(callback)
    .catch(function (error) {
      console.log(error);
    });
  }

  getLoggedInUser(callback) {
    axios.get('api/users/me')
  	  .then(callback)
  	  .catch(function (error) {
      console.log(error);
  	});
  }

  login(params, callback) {
    axios.post('api/users/login', params)
    .then(callback)
    .catch(function (error) {
      console.log(error);
    });
  }

  logout(callback) {
    axios.get('api/users/logout')
    .then(callback)
    .catch(function (error) {
      console.log(error);
    });
  }

}

export default UsersApi;