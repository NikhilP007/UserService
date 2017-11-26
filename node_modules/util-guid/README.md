
# Util-guid [![Build Status](https://travis-ci.org/forsigner/util-guid.svg?branch=master)](https://travis-ci.org/forsigner/util-guid) [![NPM Version](http://img.shields.io/npm/v/util-guid.svg?style=flat)](https://www.npmjs.org/package/util-guid)

Genearte GUID for Web or Node.js, Useful for create unique ID for DOM.

## Demo

[demo](http://forsigner.com/util-guid)

## Install

#### bower

```bash
$ bower install util-guid --save
```

#### npm

```bash
$ npm install util-guid --save
```

## Usage

#### Browser

```html
<script src="bower_components/util-guid/dist/js/util-guid.js"></script>
```

```js
// Default
console.log(guid()); // 3a9bce5ce3a7b487baa3f5b4feb0d338

// Length 32
console.log(guid(32)); //58211e4a580bdf0f0aaa4e6ab07b8c6c

// Length 16
console.log(guid(16)); // 0ef591e825cd743a
```
#### Node.js

```js
var guid = require('util-guid');

// Default
console.log(guid()); // 3a9bce5ce3a7b487baa3f5b4feb0d338

// Length 32
console.log(guid(32)); //58211e4a580bdf0f0aaa4e6ab07b8c6c

// Length 16
console.log(guid(16)); // 0ef591e825cd743a
```

## License

  [MIT](LICENSE)
