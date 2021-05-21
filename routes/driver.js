const express = require('express');
const router = express.Router();

const transport = require('../controller/driver.controller.js');

router.post('/addBus', transport.createBus);
router.get("/allBuses", transport.findAllBuses);
router.get("/findBusById/:driverId", transport.findBusById);
module.exports = router;