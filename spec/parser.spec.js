var assert = require('assert');
var IceParser = require('..');
var meta = "StreamTitle='nirvana - smells like teen spirit';StreamUrl='';";


describe('IceParser', function() {

  describe('parse()', function() {
    var parse = IceParser.parse;

    it('return data object', function() {
      assert.deepEqual(parse(meta), {title: 'nirvana - smells like teen spirit'});
    });
  });


  describe('instance', function() {

    it('return data object', function() {
      var parser = new IceParser();
      assert.deepEqual(parser.parse(meta), {title: 'nirvana - smells like teen spirit'});
    });

    it('use rules to parse properties from parsed ones', function() {
      var rule = [/([\w\s]+)\s\-\s([\w\s]+)/, 'artist', 'title'];
      var parser = new IceParser({title: rule});

      assert.deepEqual(parser.parse(meta), {
        artist: 'nirvana',
        title: 'smells like teen spirit'
      });
    });
  });
});
