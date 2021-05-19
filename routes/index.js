var express = require('express');
var router = express.Router();
let fs = require('fs')
// var mysql =require('./mysql');
var Score =require('./bean/login')
var mysql      = require('mysql');
const Login = require('./bean/login');

/* GET home page. */



var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '19860912',
  database : 'myy'
});


router.get("/rightBox",(req,res)=>{
    res.render('insert')
  })
  
  router.get("/login",(req,res)=>{
      res.render('insert')
    })

router.get('/', function(req, res, next) {
  connection.query("select * from login",function(err,results,fields){
    console.log(results);
    console.log("fields"+fields);
 
    res.render("bk",{
      data:results
    })
     
 }) ;
});
router.post('/rightBox',(req,res)=>{
    let login= new Login(req.body.username,req.body.password)
    connection.query("insert into login(username,password) value(?,?)",[login.username, login.password],(err,result,fields) => {
      console.log(err);
      console.log(result);
      console.log(fields);
      res.redirect("/");
    });
  }) ;

  var compar = new Array(10);

  router.post('/login',(req, res) => {
  
          compar[0] = req.body.username;
          compar[1] = req.body.password;

          let sql = 'select * from login where username=? and password=? '
         
          connection.query(sql,compar,function (err, result) {
              if(result.length > 0) {

                  res.send("成功");
              }
              else {
                res.send("失败");
              }
          });
  })

module.exports = router;
