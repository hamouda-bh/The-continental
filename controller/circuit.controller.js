const Circuit = require('../models/circuit.model');

// Create and Save a new Customer
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a Customer
    const circuit = new Circuit({
        nom: req.body.nom,
        depart: req.body.depart,
        arrive: req.body.arrive,
        longeur: req.body.longeur,
        duree: req.body.duree,


    });

    // Save Customer in the database
    Circuit.create(circuit, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the circuit."
            });
        else res.send(data);
    });
};
exports.affiche = (req, res) => {
    res.render('Circuit/addCircuit');
};
// Retrieve all Customers from the database.
exports.findAll = (req, res) => {
    Circuit.getAll((err, rows) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving circuits."
            });
        else res.render('Circuit/circuit', {circuits :rows});
    });
};

// Find a single Customer with a customerId
exports.findOne = (req, res) => {
    Circuit.findById(req.params.circuitId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Customer with id ${req.params.circuitId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Customer with id " + req.params.circuitId
                });
            }
        }   else res.render('Circuit/oneCircuit', {circuit :data});
    });
};

// Update a Customer identified by the customerId in the request
exports.update = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    Circuit.updateById(
        req.params.circuitId,
        new Circuit(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found hotel with id ${req.params.circuitId}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating hotel with id " + req.params.circuitId
                    });
                }
            } else res.send(data);
        }
    );
};
// Delete a Customer with the specified customerId in the request
exports.delete = (req, res) => {
    Circuit.remove(req.params.circuitId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found hotel with id ${req.params.circuitId}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete hotel with id " + req.params.circuitId
                });
            }
        } else res.render('circuit/circuit', {circuits :data});
    });
};
// Delete all Customers from the database.
exports.deleteAll = (req, res) => {
    Circuit.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all hotels."
            });
        else res.send({ message: `All hotels were deleted successfully!` });
    });
};