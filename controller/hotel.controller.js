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
        nbr_chambre_double: req.body.nbr_chambre_double,
        nbr_chambre_single:req.body.nbr_chambre_single,
       nbr_chambre_triple:req.body.nbr_chambre_triple,
       prix_nuit_single:req.body.prix_nuit_single,
        prix_nuit_double:req.body.prix_nuit_double,
        prix_nuit_triple:req.body.prix_nuit_triple
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

// Find a single hotel with a customerId
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

exports.findPromos = (req, res) => {
    Hotel.findPromos(req.params.name,req.params.date,(err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found hotel with id ${req.params.name}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving hotel with id " + req.params.name
                });
            }
        } else res.send(data);
    });
};

exports.findByNuitSingle= (req, res) => {
    Hotel.findByNuitSingle(req.params.name, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found hotel with name ${req.params.name}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving hotel with name " + req.params.name
                });
            }
        } else res.send(data);
    });
};
exports.findByNuitDouble= (req, res) => {
    Hotel.findByNuitDouble(req.params.name, (err, data) => {

        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found hotel with name ${req.params.name}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving hotel with name " + req.params.name
                });
            }
        } else res.send(data);
    });
};
exports.findByNuitTriple= (req, res) => {
    Hotel.findByNuitTriple(req.params.name, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found hotel with name ${req.params.name}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving hotel with name " + req.params.name
                });
            }
        } else res.send(data);
    });
};


/*

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
exports.deleteId = (req, res) => {
    Hotel.removeId(req.params.hotelId, (err, data) => {
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
//delete name

exports.deleteName = (req, res) => {
    Hotel.removeName(req.params.name, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found hotel with id ${req.params.name}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete hotel with id " + req.params.name
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