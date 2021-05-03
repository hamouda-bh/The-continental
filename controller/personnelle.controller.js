const Personnelle= require("../models/personnelle.model.js");

// Create and Save a new Customer
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a Personnel
    const personnelle = new Personnelle({
        nom: req.body.nom,
        prenom: req.body.prenom,
        age: req.body.age,
        fonction: req.body.fonction,
        salaire: req.body.salaire,
        date_debut_contrat: req.body.date_debut_contrat,
        date_fin_contrat: req.body.date_fin_contrat
    });


    // Save personnel in the database
    Personnelle.create(personnelle, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the personnel."
            });
        else res.send(data);
    });
};
// Retrieve all personnels from the database.
exports.findAll = (req, res) => {
    Personnelle.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving personnels."
            });
        else res.send(data);
    });
};

// Find a single personnel with a personnelId
exports.findOne = (req, res) => {
    Personnelle.findById(req.params.personnelleId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found personnel with id ${req.params.personnelleId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving personnel with id " + req.params.personnelleId
                });
            }
        } else res.send(data);
    });
};

// Update a personnel identified by the personnelId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    Personnelle.updateById(
        req.params.personnelleId,
        new Personnelle(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found personnel with id ${req.params.personnelleId}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating personnel with id " + req.params.personnelleId
                    });
                }
            } else res.send(data);
        }
    );
};
// Delete a Customer with the specified customerId in the request
exports.delete = (req, res) => {
    Personnelle.remove(req.params.personnelleId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found personnel with id ${req.params.personnelleId}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete personnel with id " + req.params.personnelleId
                });
            }
        } else res.send({ message: `personnel was deleted successfully!` });
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
        else res.send({ message: `All personnels were deleted successfully!` });
    });
};