var express = require('express');
var router = express.Router();

// var username ="";
// var password ="";

const mysql = require ('mysql2');
const pool = mysql.createPool({
    host: 				'localhost',
    user: 				'root',
    password: 			'',
    database: 			'the_continental',
    waitForConnections: true
});
    // router.get('/login/:username', function (req, res){
    //     pool.query("SELECT id FROM `users` WHERE username==`?`"
    //         ,[req.params.username]
    //         ,function(error, result, fields){
    //             if (error){
    //                 console.log(error);
    //                 res.send(error);
    //             }
    //             else
    //                 res.send(result);
    //                 username = result;
    //         })
    // })
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});
router.get('/login',function (req,res,next) {
    res.render('login', {  title:  'login' })
});

module.exports = router;