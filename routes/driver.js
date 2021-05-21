const express = require('express');
const router = express.Router();

const driver = require('../controller/driver.controller.js');
router.get("/Drivers",driver.displayDriverManagement);
router.post('/addDriver', driver.createDriver);
router.get("/allDrivers",driver.findAllDrivers);
router.get("/findDriverById/:driverId", driver.findDriverById);
router.get("/getDriverNameUsingId/:driverId", driver.getDriverFirstNameUsingId);
router.get("/getDriverLastNameUsingId/:driverId", driver.getDriverLastNameUsingId);
router.get("/getDriverIdUsingNameAndLastName/:driverId", driver.getDriverIdUsingNameAndLastName);

module.exports = router;