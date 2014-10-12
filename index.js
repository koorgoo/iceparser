function Parser(rules) {
  this.rules = rules || {};
}


Parser.parse = function(meta) {
  return new Parser().parse(meta);
};


Parser.prototype.parse = function(meta) {
  var data = {};
  var parts = meta.split(';');

  for (var i = 0; i < parts.length; i++) {
    var ps = splitOnce(parts[i], '=');
    var prop = trimPrefix(ps[0], 'Stream');
    var value = trimQuotes(ps[1]);
    if (value.length) data[prop] = value;

    var match = this._applyRule(prop, value);
    for (var p in match) data[p] = match[p];
  }

  return data;
};


Parser.prototype._applyRule = function(name, s) {
  var rule = this.rules[name];
  /* jshint eqnull:true */
  if (rule == null) return {};
 
  var data = {};
  var match = s.match(rule[0]);
  for (var i = 1; i < rule.length; i++)
    data[rule[i]] = match[i];

  return data;
};


function splitOnce(s, separator) {
  var parts = s.split(separator);
  if (parts.length > 2) {
    var one = parts[0];
    var two = '';

    for (var i = 1; i < parts.length; i++)
      two += parts[i];

    return [one, two];
  } else
    return parts;
}


function trimPrefix(s, prefix) {
  if (s.indexOf(prefix) ===  0) {
    s = s.slice(prefix.length);
    s = s[0].toLowerCase() + s.slice(1);
  }
  return s;
}


function trimQuotes(s) {
  /* jshint eqnull:true */
 if (s == null) return '';
 else return s.replace(/^\'(.*)\'$/, function(m, text) {
  return text;
 });
}


module.exports = Parser;
