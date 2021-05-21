const express = require('express')
const router = express.Router()

const Voyages = require('../controller/voyages.controller.js');

router.post('/add', Voyages.create);

router.get('/all',Voyages.findAll);

router.get("/findOne/:voyageId", Voyages.findOne);

router.delete("/deleteOne/:voyageId", Voyages.delete);

router.delete("/deleteAll", Voyages.deleteAll);

router.put("/updateDD/:voyagesId", Voyages.updateD);

router.put("/updateDF/:voyagesId", Voyages.updateF);

//**
router.get("/form",Voyages.affiche);

router.get("/byCountry/:pays", Voyages.findByCountry,Voyages.findCountry);

router.get('/pays',Voyages.findCountry);

router.put("/updateId/:voyagesId", Voyages.update);

module.exports= router;