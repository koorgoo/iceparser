var util = require('./util');

exports['toMeta() return Icecast metadata string'] = function(test) {
  var meta = util.toMeta({title: 'song title', url: 'http://localhost'});
  test.equal(meta, "StreamTitle='song title';StreamUrl='http://localhost';");
  test.done();
};
