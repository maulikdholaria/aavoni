class PlannerApi {

  get(id, callback) {
    fetch("api/planner/" + id)
    .then(res => res.json())
    .then(callback)
  }

}

export default PlannerApi;