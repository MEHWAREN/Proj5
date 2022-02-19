var express = require('express');
const multer = require('multer');
var cors = require('cors');
require('dotenv').config()


// Configurations for multer

const storage = multer.diskStorage({
  
  // Destination for files
  destination: function(req, file, cb){
    cb(null, './storedFiles')
  },

  // Filename
  filename: function(req, file, cb){
    cb(null, Date.now()+file.originalname)
  }
})

  // Upload

const upload = multer({
  storage: storage
})

// Basic functions

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});

// Main

app.post('/api/fileanalyse', upload.single('upfile'), (req, res, next)=>{
  console.log('New file added...\n');
  res.json({name: req.file.filename, type: req.file.mimetype, size: req.file.size+' Bytes'})
  next();
})

app.get('/api/files', (req,res,next)=>{
  res.sendFile(__dirname+'/storedFiles/1645311282881document sans titre 15.18.44.docx');
})



const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port+'\n')
});
