const express = require('express');
const router = express.Router();

const bus = require('../controller/transport.controller.js');

router.post('/addBus', Bus.create);
router.get("/allBuses", Bus.findAll);
router.get("/findByName/:nomBus", Bus.findByName);
router.get("/findByCapacity/:busCapacity", Bus.findByCapacity);
router.get("/findAllBusesWithDriverName", Bus.findBusesWithDriverName);
router.delete("/deleteBusUsingId/:busId", Bus.deleteUsingId);
router.delete("/deleteBusUsingName/:busId", Bus.deleteUsingName);
router.delete("/deleteAllBuses", Bus.deleteAll);
module.exports = router;