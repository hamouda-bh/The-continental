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
    pool.query("INSERT INTO `circuit` (`id`, `nom`, `depart`, `arrive`, `longueur`, `duree`) VALUES (NULL, ?, ?, ?, ?,?);\n "
        ,[req.params.nom, req.params.depart,req.params.arrive,req.params.longueur,req.params.duree]
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
    pool.query("DELETE FROM `circuit` WHERE `circuit`.`nom` = ?;\n "
        ,[req.params.nom]
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
    pool.query("DELETE FROM `circuit` WHERE `circuit`.`id` = ?;\n "
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
    pool.query("SELECT * FROM `circuit` ;"
        ,function(error, result,champs){
            if (error){
                res.send("Not available");
            }
            else
                res.send(result);
        })
})

router.get('/getNuitSingle/:name',function(req,res){
    pool.query("SELECT depart FROM `circuit` where `circuit`.`nom` = ?;\n"
        ,function(error, result,champs){
            if (error){
                res.send("Not available");
            }
            else
                res.send(result);
        })
})
router.get('/getNuitdouble/:name',function(req,res){
    pool.query("SELECT arrive FROM `circuit` where `circuit`.`nom` = ${req.params.name};\n"
        ,function(error, result,champs){
            if (error){
                res.send("Not available");
            }
            else
                res.send(result);
        })
})
router.get('/getNuitTriple/:name',function(req,res){
    pool.query("SELECT longueur FROM `circuit` where `circuit`.`nom` = ?;\n"
        ,function(error, result,champs){
            if (error){
                res.send("Not available");
            }
            else
                res.send(result);
        })
})
router.get('/getNuitTriple/:name',function(req,res){
    pool.query("SELECT duree FROM `circuit` where `circuit`.`nom` = ?;\n"
        ,function(error, result,champs){
            if (error){
                res.send("Not available");
            }
            else
                res.send(result);
        })
})
module.exports = router;
