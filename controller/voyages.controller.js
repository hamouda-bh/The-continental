const Voyages = require("../models/voyages.model.js");


exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const voyages = new Voyages({
        id_reservation: req.body.id_reservation,
        pays: req.body.pays,
        prix: req.body.prix,
        gouvernorat: req.body.gouvernorat,
        date_debut: req.body.date_debut,
        date_fin: req.body.date_fin
    });


    Voyages.create(voyages, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the hotel."
            });
        else if(voyages.date_fin<voyages.date_debut)
            res.status(500).send({
                message: "les dates ne sont pas adéquats."
            });
        else res.send(data);
    });
};

exports.findAll = (req, res) => {
    Voyages.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving voyages."
            });
        else res.send(data);
    });
};

exports.findOne = (req, res) => {
    Voyages.findById(req.params.voyageId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found voyage with id ${req.params.voyageId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving voyage with id " + req.params.voyageId
                });
            }
        } else res.send(data);
    });
};

exports.updateD = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    Voyages.updateById_D(
        req.params.voyagesId,
        new Voyages(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Customer with id ${req.params.voyagesId}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Customer with id " + req.params.voyagesId
                    });
                }

            }
            else res.send(data);
        }
    );
};

exports.updateF = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    Voyages.updateById_F(
        req.params.voyagesId,
        new Voyages(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Customer with id ${req.params.voyagesId}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Customer with id " + req.params.voyagesId
                    });
                }
            } else res.send(data);
        }
    );
};

exports.delete = (req, res) => {
    Voyages.removeId(req.params.voyageId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found voyages with id ${req.params.voyageId}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete voyages with id " + req.params.voyageId
                });
            }
        } else res.send({ message: `voyages was deleted successfully!` });
    });
};

exports.deleteAll = (req, res) => {
    Voyages.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all voyages."
            });
        else res.send({ message: `All voyages were deleted successfully!` });
    });
};
