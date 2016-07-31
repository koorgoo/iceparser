iceparser
=========

Icecast stream metadata parser for Node.js


### Install

```shell
npm install koorgoo/iceparser
```


### Usage

```js
var ice = require('iceparser');
var meta = "StreamTitle='NIRVANA - Smells Like Teen Spirit';";

ice.parse(meta);  // {title: 'NIRVANA - Smells Like Teen Spirit'}

var rule = [/([\w\s]+)\s\-\s([\w\s]+)/, 'artist', 'title'];
var step = {name: 'title', rule: rule, options: {lower: true}};
var parser = new ice(step);  // Initialize with step object or steps array

parser.parse(meta);  // {artist: 'nirvana', title: 'smells like teen spirit'}
```

#### Step Options

```js
{
    html: true|false,   // decode HTML
    lower: true|false   // convert to lower case
}
```
