const expect = require('chai').expect;
const fixturify = require('fixturify');
const dirToJson = require('../index');
const rm = require('rimraf').sync;

describe('dir-to-json', function () {
  let directory = {
    'test-1': {
      'a.txt': 'hello',
      'test-1': {
        'b.txt': 'b contains text'
      },
      'x.txt': 'one more file'
    },
    'test-2': {
      'a.txt': 'this is same other',
      'c.txt': 'this is new file',
      'test-sub-1': {
        'sub-b.txt': 'this is inside test-sub-1',
        'test-sub-sub-1': {
          'sub-sub-b.txt': 'this is inside of test-sub-sub-1'
        }
      },
      'test-sub-2': {

      }
    },
    'test-3': {
      'd.txt': 'this is different file',
      'b.txt': 'This is file which is same as test-1/test-1/b.txt',
      'test-sub-1': {
        'sub-c.txt': 'this is inside test-sub-1',
        'test-sub-sub-1': {
          'sub-sub-c.txt': 'this is inside of test-sub-sub-1'
        }
      }
    }
  }
  before(function() {
    fixturify.writeSync('fixtures', directory);
  });
  after(function () {
    rm('fixtures');
  });
  it('read directory as expected', function () {
    let dirJson = dirToJson('fixtures');
    expect(dirJson).to.deep.equal(directory);
  });
  it(`reads relative path`, function () {
    let dirJson = dirToJson('./fixtures');
    expect(dirJson).to.deep.equal(directory);
  });
  it(`reads subdirectories`, function () {
    let dirJson = dirToJson('fixtures/test-3/test-sub-1/');
    expect(dirJson).to.deep.equal(directory['test-3']['test-sub-1']);
  });
  it(`can read file`, function () {
    let dirJson = dirToJson('fixtures/test-3/d.txt');
    expect(dirJson).to.deep.equal({
      'd.txt': 'this is different file'
    });
  });
  it(`Throws error if directory doesn't exist`, function () {
    let dirPath = 'fixtures/test-4';
    expect(() => { dirToJson(dirPath) }).to.throws(`Path ${dirPath} doesn't exist`);
  });
  it(`Throws access error`, function () {
    let dirPath = '/etc/';
    expect(() => { dirToJson(dirPath) }).to.throws(/EACCES:.*/);;
  });
});