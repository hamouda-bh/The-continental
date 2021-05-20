const Bus = require("../models/bus.model.js");
// const Voiture = require("../models/voiture.model.js");

// Create and Save a new Customer
exports.createBus = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a Bus
    const bus = new Bus({
        nom: req.body.nom,
        id_chauffer: req.body.id_chauffer,
        capacite: req.body.capacite,
        minibus:req.body.minibus,
        prix_location_jour:req.body.prix_location_jour,
    });

    // Save Customer in the database
    Bus.createBus(bus, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Bus."
            });
        else res.send(data);
    });
};

// Retrieve all Buses from the database.
exports.findAllBuses = (req, res) => {
    Bus.findAllBuses((err, rows) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Buses."
            });
        else res.render('transport/transport',{buses : rows});
    });
};

// Retrieve Bus from the database using the busId
exports.findBusById = (req, res) => {
    Bus.findBusById(req.params.busId,(err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found bus with id ${req.params.busId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving bus with id " + req.params.busId
                });
            }
        } else res.send(data);
    });
};

// Update Bus row in the database where id = busId
exports.updateBusById = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    Bus.updateBusById(req.params.busId,  new Bus(req.body),  (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found bus with id ${req.params.busId}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating bus with id " + req.params.busId
                    });
                }
            } else res.send(data);
        }
    );
};

// Remove a Bus from the database where the id = busId
exports.deleteBusUsingId = (req, res) => {
    Bus.deleteBusUsingId(req.params.busId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found bus with id ${req.params.busId}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete bus with id " + req.params.busId
                });
            }
        } else res.send({ message: `bus was deleted successfully!` });
    });
};

// Remove all Buses
exports.deleteAllBuses = (req, res) => {
    Bus.deleteAllBuses((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all buses."
            });
        else res.send({ message: `All buses were deleted successfully!` });
    });
};

// Remove a Bus buy typing its Name
// exports.deleteUsingName = (req, res) => {
//     Bus.deleteUsingName((err, data) => {
//         if (err)
//             res.status(500).send({
//                 message:
//                     err.message || "Some error occurred while retrieving Buses."
//             });
//         else res.send(data);
//     });
// };

// Retrieve Bus from the database using the driver name
// exports.findBusesWithDriverName = (req, res) => {
//     Bus.findBusesWithDriverName(req.params.driverName,(err, data) => {
//         if (err) {
//             if (err.kind === "not_found"){
//                 res.status(404).send({
//                     message:
//                         err.message || `Not found Bus with driver name = ${req.params.driverName}.`
//                 });
//             }else{
//                 res.status(500).send({
//                     message: "Error retrieving bus with driver name = " + req.params.driverName
//                 });
//             }
//         }
//
//         else res.send(data);
//     });
// };

// Retrieve bus using name
// exports.findByName = (req, res) => {
//     if (!req.body) {
//         res.status(400).send({
//             message: "Content can not be empty!"
//         });
//     }
// };