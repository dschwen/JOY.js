#!/usr/bin/env node

var fs = require('fs');
var texte = {};

// print process.argv
process.argv.forEach(function(val, index, array) {
  if (index < 2) return;
  
  var data = fs.readFileSync(val,'ascii');
  console.log(data);

  var file = [];
  
  texte[val] = room;
});

console.log(JSON.stringify(texte));

