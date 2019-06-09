const axios = require('axios');

class UsersApi {

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