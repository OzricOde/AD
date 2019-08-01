const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const sql = require('mysql')
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

var x, y, z, h, heart, glat, glong

var id = 0;

app.use(express.static(path.join(__dirname, 'public')));
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());



app.listen(8000, () => {
  console.log('app listening at port 8000');
});

var pool = sql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "tada"
});

var records = [];

app.get('/dispacc', (req, res) => {

  var q
  pool.query(`SELECT * FROM acc LIMIT 20 OFFSET ${id}`, function (err, result, fields) {
    if (err) throw err;
    id = id + 20
    q = JSON.stringify(result)
    res.send(`${q}`);
  });
})

app.get('/dispgy', (req, res) => {
  var q
  pool.query(`SELECT * FROM gyro LIMIT 20 OFFSET ${id}`, function (err, result, fields) {
    if (err) throw err;
    id = id + 20
    q = JSON.stringify(result)
    res.send(`${q}`);
  });
})

const csvWriter = createCsvWriter({
  param:{
    append:true
  },
  path: 'raw.csv',
  header: [          
      {id: 'fax', title: 'fax'},
      {id: 'fay', title: 'fay'},
      {id: 'faz', title: 'faz'},
      {id: 'fgx', title: 'fgx'},
      {id: 'fgy', title: 'fgy'},
      {id: 'fgz', title: 'fgz'},
      {id: 'fhrate', title: 'fhrate'},
      {id: 'foq', title: 'foq'},
      {id: 'fox', title: 'fox'},
      {id: 'foy', title: 'foy'},
      {id: 'foz', title: 'foz'},
      {id: 'label', title:'label'},
  ]
});

app.get('/', function (req, res) {
  res.send('<html><body><h1>Hello World</h1></body></html>');
  var j = 0;
  var min = Math.min(fa.length,fg.length,fh.length,fo.length)
  console.log(fa.length,fg.length,fh.length,fo.length)
  var label = 'n'
  for(var i = 0; i < min;  i++){
    var ir = getRandomInt(min)
    records[records.length] = {
      fax:fa[i].x,
      fay:fa[i].y,
      faz:fa[i].z,
      fgx:fg[i].x,
      fgy:fg[i].y,
      fgz:fg[i].z,
      fhrate:fh[i].x,
      foq:fo[i].q,
      fox:fo[i].x,
      foy:fo[i].y,
      foz:fo[i].z,
      label:label
    }
  }
    csvWriter.writeRecords(records)       // returns a promise
    .then(() => {
        console.log('...Done');
    });
    
});

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

var fa = [] 
var fg = [] 
var fh = []
var fo = []
var iter = 0;

app.post('/data', (req, res) => {
    console.log("hitting data")
    iter = iter + 1   
    res.send(JSON.stringify({status:1}))  
    console.log(req.headers.acc) 
    if(req.headers.acc){
     r=JSON.parse(req.headers.acc)
      h=r.time
      x=r.x
      z=r.z 
      y=r.y
      fa[fa.length] = {
        h,x,z,y
      }
    }
    if(req.headers.gy){
      r=JSON.parse(req.headers.gy)
      h=r.time
      x=r.x
      z=r.z
      y=r.y
      fg[fg.length] = {
        h,x,z,y
      }
    }
    if(req.headers.heart){
      r=JSON.parse(req.headers.heart)
      h=r.time
      x=r.x
      fh[fh.length] = {
        h,x
      }
    }
    if(req.headers.ori){
      r=JSON.parse(req.headers.ori)
      // console.log(r)
      t=r.time
      q=r.q
      x=r.x
      y=r.y
      z=r.z
      fo[fo.length] = {
        q,x,z,y
      }
    }
})


app.get('/chart', function (req, res) {
  // console.log(path.join(__dirname + '/public/gr.html'))
  res.sendFile(path.join(__dirname + '/public/canvas.html'));


})



// app.post('/sendAudio', (req, res) => {
  
//   iter = iter+1;
//   console.log(iter/3)
//   console.log(req.body.acc_x)
//   console.log(req.body.gyro_x)
//   if(req.body.acc_x){
//      var obj = {
//       a:req.body.acc_x,
//       b:req.body.acc_y,
//       c:req.body.acc_z, 
//      }
//     pa[pa.length]= obj
//   }
//   else if(req.body.gyro_x){
//     var obj = {
//       a:req.body.gyro_x,
//       b:req.body.gyro_y,
//       c:req.body.gyro_z, 
//      }
//     pg[pg.length]= obj
//   } 
//   else{
//      var obj = {
//       a:req.body.mag_x,
//       b:req.body.mag_y,
//       c:req.body.mag_z, 
//      }
//     pm[pm.length]= obj
//   }
// })


app.post('/Activity', (req, res) => {
  console.log(req.body)
})