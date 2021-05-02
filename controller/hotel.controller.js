const Hotel = require("../models/hotel.model.js");

// Create and Save a new Customer
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a Customer
    const hotel = new Hotel({
        name: req.body.name,
        gouvernorat: req.body.gouvernorat,
        nbr_chambre_double: req.body.nbr_chambre_double
    });

    // Save Customer in the database
    Hotel.create(hotel, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the hotel."
            });
        else res.send(data);
    });
};
// Retrieve all Customers from the database.
exports.findAll = (req, res) => {
    Hotel.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving hotels."
            });
        else res.send(data);
    });
};

// Find a single Customer with a customerId
exports.findOne = (req, res) => {
    Hotel.findById(req.params.hotelId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found hotel with id ${req.params.hotelId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving hotel with id " + req.params.hotelId
                });
            }
        } else res.send(data);
    });
};
/*
// Update a Customer identified by the customerId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    Hotel.updateById(
        req.params.hotelId,
        new Hotel(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found hotel with id ${req.params.hotelId}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating hotel with id " + req.params.hotelId
                    });
                }
            } else res.send(data);
        }
    );
};*/
// Delete a Customer with the specified customerId in the request
exports.delete = (req, res) => {
    Hotel.remove(req.params.hotelId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found hotel with id ${req.params.hotelId}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete hotel with id " + req.params.hotelId
                });
            }
        } else res.send({ message: `hotel was deleted successfully!` });
    });
};
// Delete all Customers from the database.
exports.deleteAll = (req, res) => {
    Hotel.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all hotels."
            });
        else res.send({ message: `All hotels were deleted successfully!` });
    });
};