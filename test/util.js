var titlize = require('titlize');

function toMeta(obj) {
  var meta = '';
  for (var prop in obj)
    if (obj.hasOwnProperty(prop))
      meta += 'Stream' + titlize(prop) + "='" + obj[prop] + "';";
  return meta;
}

module.exports = {
  toMeta: toMeta
};
