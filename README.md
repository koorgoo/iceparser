iceparser
=========

Icecast stream metadata parser for Node.js


### Install

```shell
npm install iceparser
```


### Usage

```js
var ice = require('iceparser');
var meta = "StreamTitle='nirvana - smells like teen spirit';";

ice.parse(meta);  // {title: 'nirvana - smells like teen spirit'}

// Initialize instance with rules object
var rule = [/([\w\s]+)\s\-\s([\w\s]+)/, 'artist', 'title'];
var parser = new ice({title: rule});

parser.parse(meta);  // {artist: 'nirvana', title: 'smells like teen spirit'}
```