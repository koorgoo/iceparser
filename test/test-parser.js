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

exports['parser parse step by step'] = function(test) {
  var meta = toMeta({title: 'popular artist - favourite song'});
  var steps = {name: 'title', rule: [/([\w\s]+)\s\-\s([\w\s]+)/, 'artist', 'title']};
  var data = new Parser(steps).parse(meta);
  test.deepEqual(data, {artist: 'popular artist', title: 'favourite song'});
  test.done();
};

exports['ignore step when no data for it'] = function(test) {
  var meta = toMeta({title: 'song'});
  var steps = {name: 'artist', rule: [/.*/, 'artist']};
  var data = new Parser(steps).parse(meta);
  test.deepEqual(data, {title: 'song'});
  test.done();
};

exports['accept arg[] in step\'s rule'] = function(test) {
  var meta = toMeta({title: 'one two three'});
  var steps = {name: 'title', rule: [/(.*)\s(.*)\s(.*)/, 'first', 'others[]']};
  var data = new Parser(steps).parse(meta);
  test.deepEqual(data, {title: 'one two three', first: 'one', others: ['two', 'three']});
  test.done();
};

exports['accept arg[length] in step\'s rule'] = function(test) {
  var meta = toMeta({title: 'one two three'});
  var steps = {name: 'title', rule: [/(.*)\s(.*)\s(.*)/, 'first[2]', 'last']};
  var data = new Parser(steps).parse(meta);
  test.deepEqual(data, {title: 'one two three', first: ['one', 'two'], last: 'three'});
  test.done();
};

exports['parser parse with few steps in series'] = function(test) {
  var meta = toMeta({title: 'Artist &amp; A/Artist B - Song'});
  var steps = [
    {name: 'title', rule: [/(.*)\s-\s(.*)/, '_artist', 'title']},
    {name: '_artist', rule: [/(.*)\/(.*)/, 'artists[]']}
  ];
  var data = new Parser(steps).parse(meta);
  test.deepEqual(data, {artists: ['Artist &amp; A', 'Artist B'], title: 'Song'});
  test.done();
};

exports['parser parse with options'] = function(test) {
  var meta = toMeta({title: 'SONG &amp; SONG'});
  var steps = {name: 'title', rule: [/(.*)/, 'title'], options: {html: true, lower: true}};
  var data = new Parser(steps).parse(meta);
  test.deepEqual(data, {title: 'song & song'});
  test.done();
};
