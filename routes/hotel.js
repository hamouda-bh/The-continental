
const express = require('express')
const router = express.Router()

const Hotel = require('../controller/hotel.controller.js');

router.post('/add', Hotel.create);

router.get('/',Hotel.findAll);
    // Create a new Customer
   /* cntrl.post("/Hotel", Hotel.create);

    // Retrieve all Hotel
    cntrl.get("/Hotel/all", Hotel.findAll);

    // Retrieve a single Customer with customerId
    cntrl.get("/Hotel/:hotelId", Hotel.findOne);

    // Update a Customer with customerId
    cntrl.put("/Hotel/:hotelId", Hotel.update);

    // Delete a Customer with customerId
    cntrl.delete("/Hotel/:hotelId", Hotel.delete);

    // Create a new Customer
    cntrl.delete("/Hotel", Hotel.deleteAll);*/
module.exports= router;