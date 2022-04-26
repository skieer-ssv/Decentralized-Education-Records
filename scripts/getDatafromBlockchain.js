// 0xd9145CCE52D386f254917e481eB44e9943F39138
const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const {  abi } = require("./compile");
const provider = new HDWalletProvider('left twin abuse soft upset never best physical giggle denial such pitch' , 'https://rinkeby.infura.io/v3/bf47eb7af5da4f3ab89f73a8c99cbb9c');
const web3 = new Web3(provider);
const contractAddress= "0x507655AbCFEC495Bbc243d52d74896F2D273cE6C";
export const deployToBlockchain = async () => {
    try{


const contract= await new web3.eth.Contract(abi,contractAddress);

try{
    //fetch data from contract
    const data = await contract.methods.getIpfsHash().call();
    console.log("Data from contract: ",data['ipfsHash']);

}
catch(e){

    console.log("Error occurred while fetching data: ",e);
}
    }
    catch(e){
console.log("Error occurred while checking: ",e);
    }
    
};


