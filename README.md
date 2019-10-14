# DirToJson

This module is created to convert content of path into JSON.

For example:

```js
/*
  test
  └──test-1
      └── a.txt: 'a'
      └── b.txt: 'b'
  └──test-2
      └── c.txt: 'c'
      └── d.txt: 'd'
      └── sub-dir
            └── x.txt: 'x'
            └──y.txt: 'y'
  └── test-3
        └── e.txt: 'e'
        └── a.txt: 'test-3-a'
 */
const dirToJson = require('dir-to-json');
const dirJson = dirToJson('test');
console.log(dirJson);
/*
{
  'test-1': {
    a.txt: 'a',
    b.txt: 'b'
  },
  'test-2': {
    c.txt: 'c',
    d.txt: 'd',
    'sub-dir': {
      x.txt: 'x',
      y.txt: 'y'
    }
  },
  'test-3': {
    e.txt: 'e',
    a.txt: 'test-3-a'
  }
}
 */

```
