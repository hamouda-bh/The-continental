
const express = require('express')
const router = express.Router()

const Hotel = require('../controller/hotel.controller.js');

    router.post('/add', Hotel.create);

    router.get('/all',Hotel.findAll);

router.get("/nuitSingle/:name",Hotel.findByNuitSingle);
router.get("/nuitDouble/:name",Hotel.findByNuitDouble);
router.get("/nuitTriple/:name",Hotel.findByNuitTriple);

    router.get("/findOne/:hotelId", Hotel.findOne);

    // cntrl.put("/Hotel/:hotelId", Hotel.update);

 router.delete("/deleteOne/:hotelId", Hotel.deleteId);
router.delete("/deleteName/:hotelName",Hotel.deleteName);

    // Create a new Customer
    router.delete("/deleteAll", Hotel.deleteAll);
module.exports= router;