import React from 'react';

class SearchApi {

  getItems() {
    fetch("api/search")
    .then(res => res.json())
    .then(
      (result) => {
	    return result;
		// this.setState({
		//   isLoaded: true,
		//   items: result.items
		// });
	  },
	// Note: it's important to handle errors here
	// instead of a catch() block so that we don't swallow
	// exceptions from actual bugs in components.
	  (error) => {
	  	return error;
		// this.setState({
		//   isLoaded: true,
		//   error
		// });
	  }
    )
  }

}

export default SearchApi;