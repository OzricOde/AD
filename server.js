const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const multer = require('multer');
const fs = require('fs')

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'fetchusn/')
  },
  filename: function (req, file, cb) {
    console.log(file)
    cb(null, file.originalname)
  }
})

var upload = multer({ storage: storage });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/index', express.static(path.join(__dirname, 'public')))
// app.use('/analytics', express.static(path.join(__dirname, 'public'))

app.listen(7000, ()=> {
    console.log('app listening at port 7000');
});

app.put('/sendAudio', (req, res) => {
    console.log("sdkjfhsdkjhfksjdfhkjsdfkjh")
    res.send("dkjfghkfjdghkjfdg")
})

app.post('/fitbit', (req, res) => {
    console.log("req", req)
    console.log("sdkjfhsdkjhfksjdfhkjsdfkjh")
    // res.send(JSON.stringify({status:1}))
    res.send("dlfjghldfkjgh")
})

