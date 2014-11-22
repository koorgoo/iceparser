var he = require('he');


function OptionsProcessor(opts) {
  this.options = _extend({
    html: false,
    lower: false
  }, opts || {});
}

OptionsProcessor.prototype.process = function(value) {
  if (this.options.html)
    value = he.decode(value);

  if (this.options.lower)
    value = value.toLowerCase();

  return value;
}


function Parser(steps) {
  steps = steps || [];
  this.steps = _isObject(steps) ? [steps] : steps;
}


Parser.parse = function(meta) {
  return new Parser().parse(meta);
};


Parser.prototype.parse = function(meta) {
  var data = {};
  var parts = meta.replace("';", "'ICEPARSER").split('ICEPARSER');

  for (var i = 0; i < parts.length; i++) {
    var ps = _splitOnce(parts[i], '=');
    var prop = _trimPrefix(ps[0], 'Stream');
    var value = _trimQuotes(ps[1]);
    if (value.length) data[prop] = value;
  }

  this._walk(data);
  this._clean(data);
  return data;
};


Parser.prototype._walk = function(data) {
  for (var i = 0; i < this.steps.length; i++)
    this._step(this.steps[i], data)
  return data;
}


Parser.prototype._clean = function(data) {
  for (var prop in data)
    if (data.hasOwnProperty(prop) && prop[0] === '_')
      delete data[prop];
  return data;
}


Parser.prototype._step = function(step, data) {
  if (data[step.name] == null) return data;

  var s = data[step.name];
  var rule = step.rule;
  var op = new OptionsProcessor(step.options);
  var match = s.match(rule[0]);

  if (!match)
    return data;

  var argCounter = 0;
  var prev, value;

  for (var i = 1; i < match.length; i++) {
    value = op.process(match[i]);

    if (prev && _isArray(prev.value) && (prev.length == Infinity || prev.length > 0)) {
      prev.value.push(value);
      prev.length--;
      continue;
    }

    prev = this._create(rule[++argCounter]);
    if (_isArray(prev.value)) {
      prev.value.push(value);
      prev.length--;
    } else prev.value = value;

    data[prev.name] = prev.value;
  }

  return data;
};


Parser.prototype._create = function(argument) {
  var arg = {};
  var match = argument.match(/\[(\d*)\]/);

  if (match) {
    arg.value = [];
    arg.name = argument.split('[')[0];
    arg.length = match[1] || Infinity;
  } else {
    arg.value = '';
    arg.name = argument;
  }

  return arg;
};


function _splitOnce(s, separator) {
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


function _trimPrefix(s, prefix) {
  if (s.indexOf(prefix) ===  0) {
    s = s.slice(prefix.length);
    s = s[0].toLowerCase() + s.slice(1);
  }
  return s;
}


function _trimQuotes(s) {
  /* jshint eqnull:true */
 if (s == null) return '';
 else return s.replace(/^\'(.*)\'$/, function(m, text) {
  return text;
 });
}


function _isObject(o) {
  return Object.prototype.toString.call(o) === '[object Object]';
}


function _isArray(a) {
  return Object.prototype.toString.call(a) === '[object Array]';
}


function _extend(obj, other) {
  for (var prop in other)
    if (other.hasOwnProperty(prop))
      obj[prop] = other[prop];
  return obj;
}


module.exports = Parser;
