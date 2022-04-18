const express = require('express')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const fs = require('fs')
const deployContract = require('./scripts/deployContract');
const { addFilestoIpfs, getFileFromIpfs } = require('./scripts/ipfsScript');
const PORT = 3000;

const app = express();

//configure express
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

app.get('/', (req, res) => {
    res.render('home')
    console.log('home hit')
});

app.post('/upload', (req, res) => {
    const file = req.files.file
    const fileName = req.body.fileName
    const filePath = 'pdfs/' + fileName;

    file.mv(filePath, async (err) => {
        if (err) {
            console.log('error: failed to download the file.')
            return res.status(500).send(err)
        }
        const fileHash = await addFilestoIpfs(fileName, filePath);
        fs.unlink(filePath, (err) => {
            if (err) console.log(err)
        })

        res.render('upload', { fileName, fileHash })
    })
})




app.listen(PORT, '127.0.0.1', () => {
    console.log('Server is running on port:', PORT)
})


// deployContract();