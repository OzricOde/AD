const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const sql=require('mysql')
var x,y,z,h,heart,glat,glong
// var global
var id=0;
// console.log(id)
// // app.use(bodyParser.urlencoded({ extended: true }));
// // app.use(bodyParser.json());
// app.use(express.static(path.join(__dirname, 'public')));


app.listen(3001, ()=> {
    console.log('app listening at port 3001');
});

var con = sql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "ad"
});
con.connect(function(err){
  if(err){
    console.log('Error connecting to Db');
    return;
  }
  console.log('Connection established');
});
// con.query("SELECT * FROM acc", function (err, result, fields) {
//   if (err) throw err;
//   console.log(result);
// });
// con.query('INSERT INTO acc(time,x,y,z) VALUES(?,?,?,?)',[8,4,6,5],function(err,result){
//   if(err) throw err
//  })
// con.query('INSERT INTO gyro(time,x,y,z) VALUES(?,?,?,?)',[5,5,5,5],function(err,result){
//   if(err) throw err
//  })
// var delayInMilliseconds = 5000;


app.post('/data', (req, res) => {
    // console.log("req", req)



    console.log("data from fitbit")
    // res.send(JSON.stringify({status:1}))
    
    res.send(JSON.stringify({status:1}))
    
    console.log(req.headers)
    
    
    if(req.headers.acc){
      console.log(JSON.parse(req.headers.acc))
     r=JSON.parse(req.headers.acc)
      h=r.time
     x=r.x
     z=r.z 
     y=r.y
     con.query('INSERT INTO acc(time,x,y,z) VALUES(?,?,?,?)',[h,x,y,z],function(err,result){
      if(err) throw err
     })
    }

    if(req.headers.gy){
    h=r.time
     x=r.x
     z=r.z
     y=r.y
     con.query('INSERT INTO gyro(time,x,y,z) VALUES(?,?,?,?)',[h,x,y,z],function(err,result){
      if(err) throw err
     })
    }
    if(req.headers.heart){
      h=r.time
       x=r.x
       con.query('INSERT INTO heart(time,hrate) VALUES(?,?)',[h,x],function(err,result){
        if(err) throw err
       })
      }


  })


// con.query('INSERT INTO gyro VALUES(3,12,12,12)',function(err,result){
//   if(err) throw err
// })

// con.query('INSERT INTO acc VALUES(3,12,12,12)',function(err,result){
//   if(err) throw err
// })


app.get('/dispacc', (req, res) => {
  
  var q
  con.query(`SELECT * FROM acc LIMIT 20 OFFSET ${id}`, function (err, result, fields) {
    if (err) throw err;
    // console.log(result);
    // for(var i in result){
    //   console.log(result[i])
    // }
    id=id+20
     q=JSON.stringify(result)
    //  for(var i = 0; i < result.length; i++){
    //    res.redirect('/chart')
    //  }
    // res.send(q)
    res.send(`${q}`);
  });
})
  app.get('/dispgy', (req, res) => {
  
    var q
    con.query(`SELECT * FROM gyro LIMIT 20 OFFSET ${id}`, function (err, result, fields) {
      if (err) throw err;
    
      // console.log(result);
      // for(var i in result){
      //   console.log(result[i])
      // }
      id=id+20
       q=JSON.stringify(result)
      //  for(var i = 0; i < result.length; i++){
      //    res.redirect('/chart')
      //  }
      // res.send(q)
      res.send(`${q}`);
    });
})


app.get('/', function (req, res) {
  res.send('<html><body><h1>Hello World</h1></body></html>');
});

app.get('/chart',function(req,res){
    // console.log(path.join(__dirname + '/public/gr.html'))
  res.sendFile(path.join(__dirname + '/public/canvas.html'));

})
