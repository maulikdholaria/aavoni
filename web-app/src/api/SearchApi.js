class SearchApi {

  getItems(callback) {
    fetch("api/search")
    .then(res => res.json())
    .then(callback)
  }

}

export default SearchApi;