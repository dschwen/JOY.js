#!/usr/bin/env node

var fs = require('fs');
var texte = {};

// print process.argv
process.argv.forEach(function(val, index, array) {
  if (index < 2) return;

  var data = fs.readFileSync(val,'binary').split("\n");
  var unterhaltung  = {
    frage: [null], antwort: [null], ja: [null], nein: [null],
    erscheinen: [null], alterscheinen: [null]
  }
  var i, j=1, fragen = parseInt(data[0], 10);
  for (i=1; i<=fragen; ++i) {
    unterhaltung.frage[i] = data[j++];
    unterhaltung.erscheinen[i] = data[j++];
    unterhaltung.alterscheinen[i] = unterhaltung.erscheinen[i];
  }
  unterhaltung.frage[11] = "UNTERHALTUNG BEENDEN";
  unterhaltung.erscheinen[11] = 0;

  i = 1;

  function input()
  {
    var r = [];
    while (data[j] && data[j] != '*') {
      r.push(data[j++]);
    }
    j++;
    return r.join('\n');
  }

  var befehl = "";

  do
  {
    if (befehl == "") {
      befehl = input();
    }
    if (befehl == "TEXT") {
      unterhaltung.antwort[i] = input();
      befehl = "";
    }
    if (befehl == "") {
      befehl = input();
    }
    if (befehl == "J/N") {
      unterhaltung.ja[i] = input();
      unterhaltung.nein[i] = input();
      befehl = "";
    }
    i++;
  } while (i<=fragen);

  texte[val] = unterhaltung;
});

console.log(JSON.stringify(texte));
