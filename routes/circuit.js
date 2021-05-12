var express = require('express');
var router = express.Router();

    const Circuits = require("../controllers/circuit.controller.js");

    // Create a new Customer
    router.post("/circuits", Circuits.create);

    // Retrieve all Customers
router.get("/circuits", Circuits.findAll);

    // Retrieve a single Customer with customerId
router.get("/circuits/:circuitId", Circuits.findOne);

    // Update a Customer with customerId
router.put("/circuits/:circuitId", Circuits.update);

    // Delete a Customer with customerId
router.delete("/circuits/:circuitId", Circuits.delete);

    // Create a new Customer
router.delete("/circuits", Circuits.deleteAll);

module.exports = router;
