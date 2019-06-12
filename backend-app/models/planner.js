var config = require('../config');
var planners_table = require('../tables/planners');

class Planner {
  constructor(planner) {
    this.props = planner;
  }

  getInfo() {
    let plannerInfo = this.props;
    plannerInfo.about = (plannerInfo.about ==null ? '' : plannerInfo.about.toString('utf8'));
    plannerInfo.images = (plannerInfo.images == null ? [] : plannerInfo.images.split(","));
    plannerInfo.images.pop(); //removing last element as it would be empty
    
    const imgPath = '/images/planners/' + plannerInfo.id + "/";
    for (var i = 0; i < plannerInfo.images.length; i++) {
      plannerInfo.images[i] = (imgPath + plannerInfo.images[i]);
    }

    return plannerInfo;
  }

}

module.exports = Planner;