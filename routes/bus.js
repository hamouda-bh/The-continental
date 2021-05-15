const express = require('express');
const router = express.Router();

const transport = require('../controller/transport.controller.js');













router.post('/addBus', transport.createBus);
router.get("/allBuses", transport.findAllBuses);
router.get("/findBusById/:busId", transport.findBusById);
router.put("/updateBusById/:busId", transport.updateBusById);
router.delete("/deleteBusUsingId/:busId", transport.deleteBusUsingId);
router.delete("/deleteAllBuses", transport.deleteAllBuses);
// router.get("/findByName/:busName", transport.findByName);
// router.get("/findByCapacity/:busCapacity", transport.findByCapacity);
// router.get("/findAllBusesWithDriverName/:driverName", transport.findBusesWithDriverName);
// router.delete("/deleteBusUsingName/:busId", transport.deleteUsingName);
module.exports = router;