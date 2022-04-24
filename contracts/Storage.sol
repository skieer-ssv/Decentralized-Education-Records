// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract Student{
struct studentData{
string  name;
string id;
}

struct certificate{
    string title;
    string ipfsHash;
//TODO: add issuing institute and date
}
studentData s;
certificate[] c;

constructor (string memory name,string memory studentId  ){
    s.name = name;
    s.id = studentId;
}

function addCertificate(string memory title, string memory ipfsHash)public {
    c.push(certificate(title,ipfsHash));
}
function getCertificateData() public view returns(certificate[] memory){
    return c;
}
function  getStudentData() public view returns (studentData memory){
    return s;
}
}