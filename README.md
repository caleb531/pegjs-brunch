# pegjs-brunch

*Copyright 2017, Caleb Evans*  
*Released under the MIT License*

[![Build Status](https://travis-ci.org/caleb531/pegjs-brunch.svg?branch=master)](https://travis-ci.org/caleb531/pegjs-brunch)

This plugin adds [PEG.js](https://pegjs.org/) support to
[Brunch](http://brunch.io/).

## Usage

### 1. Install the package

In your project directory, run:

```bash
npm install --save-dev pegjs-brunch
```

### 2. Set plugin options

In `brunch-config.js`, you can specify any options which should be passed to the
parser generator. See the [PEG.js API reference][options] for a list of
available options.

[options]: https://pegjs.org/documentation#generating-a-parser-javascript-api

```js
module.exports = {
  // ...
  plugins: {
    pegjs: {
      cache: true,
      format: 'commonjs'
    }
  }
  // ...
};
```

### 3. Watch grammar files

Because the plugin will generate JavaScript files from any `*.pegjs` grammar
files, you must tell Brunch to watch `*.pegjs` files.

In `brunch-config.js`, add a `*.pegjs` pattern somewhere in the
`javascripts.joinTo` map.

```js
module.exports = {
  // ...
  javascripts: {
    joinTo: {
      'main.js': ['app/scripts/*.pegjs', 'app/scripts/*.js', /^node_modules/]
    }
  }
  // ...
};
```
