// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract Storage{
struct CertificateData{
string  ipfsHash;
string studentId;
}
CertificateData certificateData;

constructor (string memory ipfsHash,string memory studentId ){
    certificateData.ipfsHash = ipfsHash;
    certificateData.studentId = studentId;
}
function  getIpfsHash() public view returns (CertificateData memory){
    return certificateData;
}
}
