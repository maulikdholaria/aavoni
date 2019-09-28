var config = require('../config');
var photographers_table = require('../tables/photographers');

class photographer {
  constructor(photographer) {
    this.props = photographer;
  }

  getInfo() {
    let photographerInfo = this.props;
    photographerInfo.about = (photographerInfo.about ==null ? '' : photographerInfo.about.toString('utf8'));
    photographerInfo.images = (photographerInfo.images == null ? [] : photographerInfo.images.split(","));
    photographerInfo.images.pop(); //removing last element as it would be empty
    
    const imgPath = '/images/photographers/' + photographerInfo.id + "/";
    for (var i = 0; i < photographerInfo.images.length; i++) {
      photographerInfo.images[i] = (imgPath + photographerInfo.images[i]);
    }

    return photographerInfo;
  }

}

module.exports = photographer;