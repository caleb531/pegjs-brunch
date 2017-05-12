'use strict';

const peg = require('pegjs');

class PegJsPlugin {

  constructor(config) {
    if (config && config.plugins && config.plugins.pegjs) {
      this.config = config.plugins.pegjs;
    } else {
      this.config = {};
    }
    // The output of the below peg.generate() function must be a string, not an
    // object
    this.config.output = 'source';
  }

  compile(file) {
    try {
      const parser = peg.generate(file.data, this.config);
      return Promise.resolve({data: parser});
    } catch (error) {
      // istanbul ignore else
      if (error instanceof peg.parser.SyntaxError) {
        error.message = `${error.message} (${error.location.start.line}:${error.location.start.column})`;
      }
      return Promise.reject(error);
    }
  }

}

// brunchPlugin must be set to true for all Brunch plugins
PegJsPlugin.prototype.brunchPlugin = true;
// The type of file to generate
PegJsPlugin.prototype.type = 'javascript';
// The extension for files to process
PegJsPlugin.prototype.extension = 'pegjs';
// The extension for processed files (this allows for compiler chaining)
PegJsPlugin.prototype.targetExtension = 'js';

module.exports = PegJsPlugin;
