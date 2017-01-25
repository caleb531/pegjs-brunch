# pegjs-brunch

*Copyright 2017, Caleb Evans*  
*Released under the MIT License*

This plugin adds PegJS support to [Brunch](http://brunch.io/).

## Usage

### 1. Install the package

```bash
npm install --save-dev pegjs-brunch
```

### 2. Activate the plugin



```js
module.exports = {
  // ...
  plugins: {
    pegjs: {
      cache: true
    }
  }
  // ...
}
```
