
function getPriceRangeText(pricerange) {
  var pricerangetext = "";
  for (var i = 0; i < pricerange; i++) {
  	pricerangetext += "$";
  }
  return pricerangetext;
}

export {
   getPriceRangeText
};