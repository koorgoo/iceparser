var toMeta = require('./util').toMeta;
var Parser = require('..');

exports['parse() parse'] = function(test) {
  var meta = toMeta({title: 'artist - song'});
  test.deepEqual(Parser.parse(meta), {title: 'artist - song'});
  test.done();
};

exports['parser parse'] = function(test) {
  var meta = toMeta({title: 'artist - song'});
  var data = new Parser().parse(meta);
  test.deepEqual(data, {title: 'artist - song'});
  test.done();
};

exports['parser parse with rule'] = function(test) {
  var ruleObj = {title: [/([\w\s]+)\s\-\s([\w\s]+)/, 'artist', 'title']};
  var meta = toMeta({title: 'popular artist - favourite song'});
  var data = new Parser(ruleObj).parse(meta);
  test.deepEqual(data, {artist: 'popular artist', title: 'favourite song'});
  test.done();
};
