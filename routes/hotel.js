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

router.get('/insertHotel/:name/:gouvernorat/:nbr_chambre_single/:nbr_chambre_double/:nbr_chambre_triple/:prix_nuit_single/:prix_nuit_double/:prix_nuit_triple',function (req, res){
    pool.query("INSERT INTO `hotel` (`id`, `name`, `gouvernorat`, `nbr_chambre_single`, `nbr_chambre_double`, `nbr_chambre_triple`, `prix_nuit_single`, `prix_nuit_double`, `prix_nuit_triple`) VALUES (NULL, ?, ?, ?, ?,?, ?, ?, ?);\n "
        ,[req.params.name, req.params.gouvernorat,req.params.nbr_chambre_single,req.params.nbr_chambre_double,req.params.nbr_chambre_triple,req.params.prix_nuit_single,req.params.prix_nuit_double,req.params.prix_nuit_triple]
        ,function(error, result, fields){
            if (error){
                console.log(error);
                res.send(error);
            }
            else
                res.send(result);
        })
})

router.get('/deleteHotel/:name',function (req, res){
    pool.query("DELETE FROM `hotel` WHERE `hotel`.`name` = ?;\n "
        ,[req.params.name]
        ,function(error, result, fields){
            if (error){
                console.log(error);
                res.send(error);
            }
            else
                res.send(result);
        })
})
router.get('/deleteHotel/:id',function (req, res){
    pool.query("DELETE FROM `hotel` WHERE `hotel`.`id` = ?;\n "
        ,[req.params.id]
        ,function(error, result, fields){
            if (error){
                console.log(error);
                res.send(error);
            }
            else
                res.send(result);
        })
})

router.get('/getAllHotels',function(req,res){
    pool.query("SELECT * FROM `hotel` ;"
        ,function(error, result,champs){
            if (error){
                res.send("Not available");
            }
            else
                res.send(result);
        })
})

router.get('/getNuitSingle/:name',function(req,res){
    pool.query("SELECT prix_nuit_single FROM `hotel` where `hotel`.`name` = ?;\n"
        ,[req.params.name]
        ,function(error, result,champs){
            if (error){
                res.send("Not available");
            }
            else
                res.send(result);
        })
})
router.get('/getNuitdouble/:name',function(req,res){
    pool.query("SELECT prix_nuit_double FROM `hotel` where `hotel`.`name` = ?;\n"
        ,[req.params.name]
        ,function(error, result,champs){
            if (error){
                res.send("Not available");
            }
            else
                res.send(result);
        })
})
router.get('/getNuitTriple/:name',function(req,res){
    pool.query("SELECT prix_nuit_triple FROM `hotel` where `hotel`.`name` = ?;\n"
        ,[req.params.name]
        ,function(error, result,champs){
            if (error){
                res.send("Not available");
            }
            else
                res.send(result);
        })
})
module.exports = router;

