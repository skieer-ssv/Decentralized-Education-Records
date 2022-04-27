require('dotenv').config();
const express = require('express')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const fs = require('fs')
const {deployContract} = require('./scripts/deployContract');
const { addFilestoIpfs, getFileFromIpfs } = require('./scripts/ipfsScript');
const {getCertificate, uploadCertificateToContract} = require("./scripts/contractFunctions");
const { uploadtoMongo } = require('./scripts/connectMongo');
const PORT = process.env.PORT||3000;

const app = express();
  
//configure express
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.render('home')
    console.log('home hit')
});

app.get('/search', (req, res) => {
    res.render('searchStudent')
    console.log('search hit')
});

app.post('/upload', (req, res) => {
    const file = req.files.file
    const studentId = req.body.studentId;
    const fileName = req.body.fileName
    const filePath = 'pdfs/' + fileName;

    file.mv(filePath, async (err) => {
        if (err) {
            console.log('error: failed to download the file.')
            return res.status(500).send(err)
        }

 
        const fileHash = await addFilestoIpfs(fileName, filePath);
        
        console.log('fileHash: ', fileHash);
        const contractId = await uploadCertificateToContract(studentId,fileHash,fileName);
        fs.unlink(filePath, (err) => {
            if (err) console.log(err)
        });
        uri = process.env.MONGO_DB_URI;
console.log("uri: ",uri);
        
        
        res.render('upload', { fileHash,studentId,fileName,contractId })

        
    })
})

app.post('/certificate', async (req, res) => {
    const studentId = req.body.studentId;
    certificate = await getCertificate(studentId);
    res.render('studentDetails', {studentId, certificate});
});


app.listen(PORT, () => {
    console.log('Server is running on port:', PORT)
})


