'use strict';

const expect = require('chai').expect;
const Plugin = require('.');

describe('pegjs-brunch', function () {

  it('should initialize with no arguments', function () {
    const plugin = new Plugin();
    expect(plugin).to.be.ok;
  });

  it('should initialize with empty brunch config', function () {
    const plugin = new Plugin({});
    expect(plugin).to.be.ok;
  });

  it('should initialize with empty plugins config', function () {
    const plugin = new Plugin({plugins: {}});
    expect(plugin).to.be.ok;
  });

  it('should initialize with empty plugin config', function () {
    const plugin = new Plugin({plugins: {pegjs: {}}});
    expect(plugin).to.be.ok;
  });

  it('should generate parser from valid grammar', function (done) {
    const data = 'Integer\n\t= \'-\'\n\t[1-9][0-9]*';
    const plugin = new Plugin({
      plugins: {pegjs: {output: 'source'}}
    });
    plugin.compile({data: data, path: 'file.pegjs'}).then(file => {
      expect(file.data).to.be.a('string');
      done();
    }, error => expect(error).not.to.be.ok)
    .catch(done);
  });

  it('should throw error for invalid grammar', function (done) {
    const data = 'blahblah';
    const plugin = new Plugin();
    plugin.compile({data: data, path: 'file.pegjs'}).then(file => {
      expect(file).not.to.be.ok;
    }, error => {
      expect(error).to.be.ok;
      done();
    })
    .catch(done);
  });

  it('should provide line no./column for invalid grammar', function (done) {
    const data = 'blahblah';
    const plugin = new Plugin();
    plugin.compile({data: data, path: 'file.pegjs'}).then(file => {
      expect(file).not.to.be.ok;
    }, error => {
      expect(error.message).to.match(/1:9/);
      done();
    })
    .catch(done);
  });

  it('should generate parser as string regardless of config', function (done) {
    const data = 'Integer\n\t= \'-\'?[1-9][0-9]*';
    const plugin = new Plugin({
      plugins: {pegjs: {output: 'parser'}}
    });
    plugin.compile({data: data, path: 'file.pegjs'}).then(file => {
      expect(file.data).to.be.a('string');
      done();
    }, error => expect(error).not.to.be.ok)
    .catch(done);
  });

  it('should pass other options to parser', function (done) {
    const data = 'Integer\n\t= \'-\'?[1-9][0-9]*';
    const plugin = new Plugin({
      plugins: {pegjs: {format: 'globals', exportVar: 'foo'}}
    });
    plugin.compile({data: data, path: 'file.pegjs'}).then(file => {
      expect(file.data).to.be.a('string');
      expect(file.data).to.match(/\bfoo\s*=\s*/);
      done();
    }, error => expect(error).not.to.be.ok)
    .catch(done);
  });

  it('should be registered as Brunch plugin', function () {
    expect(Plugin.prototype.brunchPlugin).to.be.true;
  });

  it('should generate JavaScript files', function () {
    expect(Plugin.prototype.type).to.equal('javascript');
  });

  it('should process PEG.js grammars', function () {
    expect(Plugin.prototype.extension).to.equal('pegjs');
  });

  it('should enable processor chaining', function () {
    expect(Plugin.prototype.targetExtension).to.equal('js');
  });

});
