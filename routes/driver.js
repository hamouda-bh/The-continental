const express = require('express');
const router = express.Router();

const driver = require('../controller/driver.controller.js');

router.post('/addDriver', driver.createDriver);
router.get("/allDrivers",driver.findAllDrivers)
router.get("/findDriverById/:driverId", driver.findDriverById);
router.get("/getDriverNameUsingId/:driverId", driver.getDriverNameUsingId);
router.get("/getDriverLastNameUsingId/:driverId", driver.getDriverLastNameUsingId);
router.get("/getDriverIdUsingNameAndLastName/:driverId", driver.getDriverIdUsingNameAndLastName);

module.exports = router;