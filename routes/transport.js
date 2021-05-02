var express = require('express');
var router = express.Router();

const mysql = require ('mysql2');
const pool = mysql.createPool({
    host: 				'localhost',
    user: 				'root',
    password: 			'',
    database: 			'the_continental',
    waitForConnections: true
});

router.get('/transport',function (req,res,next){
   res.render('transport',{title : 'trasport Page'});
});
