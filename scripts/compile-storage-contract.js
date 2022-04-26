const path = require('path');
const fs = require('fs');
const solc = require('solc');

//This is for saveHAsh contract
const inboxPath = path.resolve(__dirname,'contracts','SaveHash.sol');
const source = fs.readFileSync(inboxPath,'utf8');
const input = {
    language: 'Solidity',
    sources: {
      'SaveHash.sol': {
        content: source 
      }
    },
    settings: {
        outputSelection: {
            '*': {
                '*': [ '*' ]
            }
        }
    }
   
  };
var output = JSON.parse(solc.compile(JSON.stringify(input)));

module.exports = output.contracts['SaveHash.sol']['HashStorage'];