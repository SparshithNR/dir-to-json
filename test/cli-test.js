const expect = require('chai').expect;
const { exec } = require('child_process');
const fixturify = require('fixturify');
const rm = require('rimraf').sync;
const path = require('path');

describe('CLI test', function () {
  let directory = {
    'test-1': {
      'a.txt': 'hello'
    }
  }
  before(function() {
    fixturify.writeSync('fixtures', directory);
  });
  after(function () {
    rm('fixtures');
  });

  it(`thows error about invalid command`, function (done) {
    let commandPath = path.normalize('./bin/dirtojson.js');
    exec(`${commandPath} asda asdas`, (err, stdout, stderr) => {
      if (stderr) {
        expect(stderr).to.be.equal('Invalid usage. Please use dirtojson [path]\n');
      }
      done();
    })
  });

  it(`returns the json result`, function (done) {
    let commandPath = path.normalize('./bin/dirtojson.js');
    exec(`${commandPath} fixtures`, (err, stdout) => {
      expect(JSON.parse(stdout)).to.deep.equal(directory);
      done();
    })
  });
});


