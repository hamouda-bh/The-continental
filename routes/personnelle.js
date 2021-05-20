const express = require('express')
const router = express.Router()

const personnelle = require('../controller/personnelle.controller.js');

router.post("/add", personnelle.create);

router.get("/all", personnelle.findAll);

router.get("/findOne/:personnelleId", personnelle.findOne);

router.put("/updatePersonnelle/:personnelleId", personnelle.update);

router.delete("/deleteOne/:personnelleId", personnelle.delete);
router.delete("/deleteAll", personnelle.deleteAll);
router.get("/form",personnelle.ahla);

module.exports= router;