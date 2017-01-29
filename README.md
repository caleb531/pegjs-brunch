# pegjs-brunch

*Copyright 2017, Caleb Evans*  
*Released under the MIT License*

[![Build Status](https://travis-ci.org/caleb531/pegjs-brunch.svg?branch=master)](https://travis-ci.org/caleb531/pegjs-brunch)

This plugin adds [PEG.js](https://pegjs.org/) support to
[Brunch](http://brunch.io/).

## Usage

### 1. Install the package

```bash
npm install --save-dev pegjs-brunch
```

### 2. Set plugin options

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
files, you must ensure that some `*.pegjs` pattern is included somewhere in your
Brunch configuration's `javascripts.joinTo` map.

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
