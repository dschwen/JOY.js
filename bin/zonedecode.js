#!/usr/bin/env node

var fs = require('fs');
var zones = {};

// print process.argv
process.argv.forEach(function(val, index, array) {
  if (index < 2) return;
  
  var data = JSON.parse(fs.readFileSync(val,'utf8'));

  var anz = data.words[data.words.length-1];
  var room = [];
  
  for (var i=0; i<anz; ++i) {
    room.push([data.words[i*4], data.words[i*4+1], data.words[i*4+2], data.words[i*4+3]]);
  }

  zones[val] = room;
});

console.log(JSON.stringify(zones));

