const express = require('express')
const router = express.Router()

const personnelle = require('../controller/personnelle.controller.js');

router.post("/personnelle", personnelle.create);

router.get("/personnelle", personnelle.findAll);

router.get("/personnelle/:personnelleId", personnelle.findOne);

router.put("/personnelle/:personnelleId", personnelle.update);

router.delete("/personnelle/:personnelleId", personnelle.delete);


module.exports= router;