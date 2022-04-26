const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const provider = new HDWalletProvider('left twin abuse soft upset never best physical giggle denial such pitch',
    'wss://rinkeby.infura.io/ws/v3/bf47eb7af5da4f3ab89f73a8c99cbb9c');
const web3 = new Web3(provider);
const { uploadtoMongo } = require('./connectMongo');
//compile files
const path = require('path');
const fs = require('fs');
const solc = require('solc');
const contractPath = path.resolve(__dirname, '..','contracts', 'Student.sol');
const source = fs.readFileSync(contractPath, 'utf8');
const input = {
    language: 'Solidity',
    sources: {
        'Student.sol': {
            content: source
        }
    },
    settings: {
        outputSelection: {
            '*': {
                '*': ['*']
            }
        }
    }

};


    const deployContract = async function () {
        let abi,evm;
        try {
            try {
                var output = JSON.parse(solc.compile(JSON.stringify(input))).contracts['Student.sol']['Student'];

                 abi= output.abi;
                 evm = output.evm;

            }
            catch (e) {
                console.log("Error occurred while compiling: ", e);
            }
            const accounts = await web3.eth.getAccounts();
            console.log('Attempting to deploy from account', accounts[0]);

            const result = await new web3.eth.Contract(abi).deploy({ data: evm.bytecode.object, arguments: ["Siddhant Vispute", "FH2018CO005"] }).send({ gas: '1000000', from: accounts[0] });
            console.log('Contract deployed to ', result.options.address);
            await uploadtoMongo("sid123",result.options.address);
            return result.options.address;
        }
        catch (e) {
            console.log("Error occured while deploying: ", e);
        }

}

module.exports = deployContract;