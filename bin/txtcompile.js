#!/usr/bin/env node

var fs = require('fs');
var texte = {};

// print process.argv
process.argv.forEach(function(val, index, array) {
  if (index < 2) return;
  
  var data = fs.readFileSync(val,'binary').replace(/^\n/,'').replace(/\n*\n$/,'');
  texte[val] = [null].concat(data.split("\n*\n"));
});

console.log(JSON.stringify(texte));

