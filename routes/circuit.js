const express = require('express');
const router = express.Router();

    const Circuit = require("../controller/circuit.controller.js");

    // Create a new Customer
    router.post("/add", Circuit.create);
    router.get("/form", Circuit.affiche);
    // Retrieve all Customers
router.get("/all", Circuit.findAll);

    // Retrieve a single Customer with customerId
router.get("/findone/:circuitId", Circuit.findOne);

    // Update a Customer with customerId
router.put("/updateone/:circuitId", Circuit.update);

    // Delete a Customer with customerId
router.delete("/deleteone/:circuitId", Circuit.delete);

    // Create a new Customer
router.delete("/circuits", Circuit.deleteAll);

module.exports = router;
