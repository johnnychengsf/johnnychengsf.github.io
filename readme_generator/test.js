const process = require('process');

process.argv.shift();
process.argv.shift();

for(let i = 0; i < process.argv.length; i++) {
   console.log(process.argv[i]);
}