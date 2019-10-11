const fs = require('fs');
const path = require('path');

function dirToJson(dirPath) {
  return convertToJson(dirPath);
}
function convertToJson(parent, child = '.') {
  let topDir = path.join(parent, child);
  if (!fs.existsSync(topDir)) {
    throw new Error(`Path ${topDir} doesn't exist`);
  }
  let filePath = path.join(parent, child);
  let fileStat = fs.lstatSync(filePath);
  if (fileStat.isFile()) {
    let obj = {};
    obj[path.basename(parent)] = fs.readFileSync(filePath, 'utf-8')
    return obj;
  }
  let directories = fs.readdirSync(topDir);
  return directories.reduce(function(fileStrucutre, directory) {
    let filePath = path.join(parent, child, directory);
    let fileStat = fs.lstatSync(filePath);
    if (fileStat.isDirectory()) {
      fileStrucutre[directory] =  convertToJson(topDir, directory);
    } else {
      fileStrucutre[directory] = fs.readFileSync(filePath, 'utf-8');
    }
    return fileStrucutre;
  }, {});
}

module.exports = dirToJson;