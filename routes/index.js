var express = require('express');
var router = express.Router();

const mysql = require ('mysql2');
const pool = mysql.createPool({
  host: 				'localhost',
  user: 				'root',
  password: 			'root',
  database: 			'the_continental',
  waitForConnections: true
});
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

