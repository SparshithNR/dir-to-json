#!/usr/bin/env node

const [,, ...args] = process.argv;

const dirtojson = require('../index');
const chalk = require('chalk');
if (args.length > 1) {
  console.error(chalk.red(`Invalid usage. Please use dirtojson [path]`));
  return;
}

if (args.length == 0) {
  console.log(chalk.green(JSON.stringify(dirtojson('./'), null, 2)));
  return;
}

return console.log(chalk.green(JSON.stringify(dirtojson(args[0]), null, 2)));