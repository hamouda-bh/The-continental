
const express = require('express')
const router = express.Router()

const Hotel = require('../controller/hotel.controller.js');

    router.post('/add', Hotel.create);

    router.get('/all',Hotel.findAll);

    router.get("/nuitSingle/:name",Hotel.findByNuitSingle);

    router.get("/nuitDouble/:name",Hotel.findByNuitDouble);

    router.get("/nuitTriple/:name",Hotel.findByNuitTriple);

    router.get("/promo/:name/:date",Hotel.findPromos);

    router.get("/findOne/:hotelId", Hotel.findOne);

    router.get("/findGouv/:gouvernorat", Hotel.findGouv);

    router.put("/updateHotel/:hotelId", Hotel.update);

    router.delete("/deleteOne/:hotelId", Hotel.deleteId);

    router.delete("/deleteName/:hotelName",Hotel.deleteName);

    router.delete("/deleteAll", Hotel.deleteAll);

    router.get("/form",Hotel.ahla);

module.exports= router;