const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const provider = new HDWalletProvider('left twin abuse soft upset never best physical giggle denial such pitch',
    'wss://rinkeby.infura.io/ws/v3/bf47eb7af5da4f3ab89f73a8c99cbb9c');
const web3 = new Web3(provider);

//compile files
const path = require('path');
const fs = require('fs');
const solc = require('solc');
const contractPath = path.resolve(__dirname, '..', 'contracts', 'Student.sol');
const source = fs.readFileSync(contractPath, 'utf8');

//
const { getContracts } = require('./connectMongo');
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

const abi = [
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "name",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "studentId",
                "type": "string"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "title",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "ipfsHash",
                "type": "string"
            }
        ],
        "name": "addCertificate",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getCertificateData",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "string",
                        "name": "title",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "ipfsHash",
                        "type": "string"
                    }
                ],
                "internalType": "struct Student.certificate[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getStudentData",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "string",
                        "name": "name",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "id",
                        "type": "string"
                    }
                ],
                "internalType": "struct Student.studentData",
                "name": "",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
]

async function getCertificate (studentId) {
    try {

        const results = await getContracts(studentId);
        console.log("from Mongodb: ",results);
        let data;
        const accounts = await web3.eth.getAccounts();
        console.log('Attempting to deploy from account', accounts[0]);
        for (let i = 0; i < results.length; i++) {
            
            const contract = await new web3.eth.Contract(abi, results[i].contractId);

            try {
                //fetch data from contract
                 data = await contract.methods.getCertificateData().call();
                console.log("Data from contract",i," : ", data);

            }
            catch (e) {

                console.log("Error occurred while fetching data: ", e);
            }
        }
        return data;
    }
    catch (e) {
        console.log("Error occurred while checking: ", e);
    }

};
async function uploadCertificateToContract (studentId,ipfsHash,title) {
    try {
        const accounts = await web3.eth.getAccounts();
        console.log('Attempting to upload certificate from account', accounts[0]);
        const results = await getContracts(studentId);
        console.log("from Mongodb: ",results);
        let data;
        for (let i = 0; i < results.length; i++) {
            const contract = await new web3.eth.Contract(abi, results[i].contractId);

            try {
                //fetch data from contract
                 data = await contract.methods.addCertificate(title,ipfsHash).send({from:accounts[0]});
                console.log("Data from contract",i," : ", data);

            }
            catch (e) {

                console.log("Error occurred while fetching data: ", e);
            }
        }
        return data.transactionHash;
    }
    catch (e) {
        console.log("Error occurred while checking: ", e);
    }

};



module.exports = {getCertificate,uploadCertificateToContract};