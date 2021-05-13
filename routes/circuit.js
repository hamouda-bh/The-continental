const express = require('express');
const router = express.Router();
//const Circuit = require("../controllers/circuit.controller.js");
const Circuit = require('../controller/circuit.controller');

    // Create a new Customer
    router.post("/circuits", Circuit.create);

    // Retrieve all Customers
router.get("/circuits", Circuit.findAll);

    // Retrieve a single Customer with customerId
router.get("/circuits/:circuitId", Circuit.findOne);

    // Update a Customer with customerId
//router.put("/circuits/:circuitId", Circuit.update);

    // Delete a Customer with customerId
router.delete("/circuits/:circuitId", Circuit.delete);

    // Create a new Customer
router.delete("/circuits", Circuit.deleteAll);

module.exports = router;
