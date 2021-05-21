const Driver = require("../models/driver.model.js");

exports.displayDriverManagement = (req,res) => {
    this.findAllDrivers();
};

//Creating Driver instance
exports.createDriver = (req, res) => {
    newDriver, (req, res) => {
        // Validate request
        if (!req.body) {
            res.status(400).send({
                message: "Content can not be empty!"

            });
        }
        var fonction = "Driver";
        // Create a Driver
        const driver = new Driver({
            nom: req.body.nom,
            prenom: req.body.prenom,
            age: req.body.age,
            driver_full_name: Driver.getDriverNameUsingId(Driver.getDriverIdWhereDriver) + "" + Driver.getDriverLastNameUsingId(Driver.getDriverIdWhereDriver),
            salaire: req.body.salaire,
            date_debut_contrat: req.body.date_debut_contrat,
            date_fin_contrat: req.body.date_fin_contrat
        });

        // Save Customer in the database
        Driver.createDriver(driver, (err, data) => {
            if (err)
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while creating the Driver."
                });
            else res.send(data);
        });
    }
}


//Display all the driver
exports.findAllDrivers = (req,res) => {
    Driver.findAllDrivers ( (err,data) => {
        if(err)
            res.status(404).send({
                message:
                    err.message || "Not found drivers due to an error."
            });
        else res.render('transport/drivers',{drivers : rows});
    });
};

//Find a certain driver by id
exports.findDriverById = (req, res) => {
    Driver.findDriverById(req.params.driverId,(err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found driver with id ${req.params.driverId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving driver with id " + req.params.driverId
                });
            }
        } else res.send(data);
    });
};

//Find Driver Name By Id
exports.getDriverFirstNameUsingId = (req,res) => {
    Driver.getDriverFirstNameUsingId(req.params.driverId, (err,data)=>{
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found driver with id ${req.params.driverId}.`
                });
            } else {
                res.status(500).send({
                    message: `Could not found driver with id  ${req.params.driverId}.`
                });
            }
        } else res.send(data);
    });
};

//Find Driver Last Name
exports.getDriverLastNameUsingId = (req,res) => {
    Driver.getDriverLastNameUsingId(req.params.driverId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found driver with id ${req.params.driverId}.`
                });
            } else {
                res.status(500).send({
                    message: `Could not found driver with id  ${req.params.driverId}.`
                });
            }
        } else res.send(data);
    });
};

//Find Driver id using LastNa
exports.getDriverIdUsingNameAndLastName= (req,res) => {
    Driver.getDriverIdUsingNameAndLastName (req.params.firstName,req.params.lastName,(err,data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found driver with firstName ${req.params.firstName} and lastName ${req.params.lastName}.`
                });
            } else {
                res.status(500).send({
                    message: `Could not found driver with firstName ${req.params.firstName} and lastName ${req.params.lastName}.`
                });
            }
        } else res.send(data);
    });
};



