const express = require('express')
const router = express.Router()

const personnelle = require('../controller/personnelle.controller.js');

router.post("/add", personnelle.create);

router.get("/all", personnelle.findAll);

router.get("/onePersonnel/:personnelleId", personnelle.onePersonnel);

router.put("/personnelle/:personnelleId", personnelle.update);

router.delete("/deleteOne/:personnelleId", personnelle.delete);
router.delete("/deleteAll", personnelle.deleteAll);
router.get("/form",personnelle.ahla);

module.exports= router;