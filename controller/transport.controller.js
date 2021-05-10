const Transport = require("../models/transport.model.js");

// Create and Save a new Customer
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a Bus
    const Bus = new Bus({
        nom: req.body.nom,
        id_chauffeur: req.body.id_chauffeur,
        capacite: req.body.capacite,
        minibus:req.body.minibus,
        prix_location_jour:req.body.prix_location_jour,
    });

    // Save Customer in the database
    Bus.create(Bus, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Bus."
            });
        else res.send(data);
    });
};

// Retrieve all Buses from the database.
exports.findById = (req, res) => {
    Bus.findById((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Buses."
            });
        else res.send(data);
    });
};

//
exports.findAll = (req, res) => {
    Bus.findAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Buses."
            });
        else res.send(data);
    });
};

//
exports.findBusesWithDriverName = (req, res) => {
    Bus.findBusesWithDriverName((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Buses."
            });
        else res.send(data);
    });
};

//
exports.deleteUsingId = (req, res) => {
    Bus.deleteUsingId((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Buses."
            });
        else res.send(data);
    });
};

//
exports.deleteUsingName = (req, res) => {
    Bus.deleteUsingName((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Buses."
            });
        else res.send(data);
    });
};

//
exports.deleteAll = (req, res) => {
    Bus.deleteAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Buses."
            });
        else res.send(data);
    });
};findByCapacity