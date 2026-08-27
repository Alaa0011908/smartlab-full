// generate-all.js
// Generates the complete data/questions/basics.js file with 336 questions
// 8 sections x 42 questions each (30 comprehensive + 12 quick)

const fs = require("fs");
const path = require("path");

let seed = 42;
function seededRandom() {
  seed = (seed * 16807) % 2147483647;
  return (seed - 1) / 2147483646;
}
