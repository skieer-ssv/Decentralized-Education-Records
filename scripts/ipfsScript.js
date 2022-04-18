//Required modules
const ipfsAPI = require('ipfs-api');
const fs = require('fs');

//Connecting to the ipfs network via infura gateway
const ipfs = ipfsAPI('ipfs.infura.io', '5001', {protocol: 'https'})


//Addfile router for adding file a local file to the IPFS network without any local node

const addFilestoIpfs = async (fileName, filePath) => {
  const file = fs.readFileSync(filePath)
 const fileAdded = await ipfs.add({path:fileName, content:file})
 const fileHash = fileAdded[0].hash;
console.log(fileAdded)
  return fileHash
}
      

// QmRqT15Pxi5VRdrZ4x68d965gx2Rrtj591MEhYF8M16had for testing
//Getting the uploaded file via hash code.
const getFileFromIpfs= function (ipfsHash) {
    
    //This hash is returned hash of addFile router.
    const validCID = ipfsHash;
  let resultData;
    ipfs.files.get(validCID, function (err, files) {
        files.forEach((file) => {
          // console.log(file.path);
          resultData=file.content.toString('utf8');
        });
      })
      return resultData;

}

module.exports = { addFilestoIpfs, getFileFromIpfs };