const sql = require("./db.js");

//constructor
const Driver = function(driver){
    this.nom = driver.nom;
    this.prenom = driver.prenom;
    this.age = driver.age;
    this.fonction = "chauffeur";
    this.salaire = driver.salaire;
    this.date_debut_contrat = driver.date_debut_contrat;
    this.date_fin_contrat = driver.date_fin_contrat;
};

Driver.createDriver = (newDriver, result) => {
    sql.query("INSERT INTO personelle SET ?",newDriver,(err,res) =>{
        if(err) {
            console.log("error: ",err);
            result(err, null);
            return;
        }
        console.log("created bus: ", { id: res.insertId, ...newDriver});
        result(null, {id: res.insertId, ...newDriver});
    });
};

Driver.findAllDrivers = result => {
    sql.query(`SELECT * FROM personelle WHERE fonction="chauffeur" ` ,(err,res) =>{
        if(err) {
            console.log("error: ",err);
            result(err, null);
            return;
        }
        if(res.length){
            console.log("found driver: ",res);
            result(null,res);
            return;
        }
        result({ kind: "not_found" },null);
    });
};

Driver.findDriverById = (driverId, result) => {
    sql.query(`SELECT nom,prenom FROM personelle WHERE id = ${driverId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found driver: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Customer with the id
        result({ kind: "not_found" }, null);
    });
};

Driver.getDriverNameUsingId = (driverId, result) => {
    sql.query(`SELECT prenom FROM personelle WHERE id = ${driverId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found driver: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Customer with the id
        result({ kind: "not_found" }, null);
    });
};

Driver.getDriverLastNameUsingId = (driverId, result) => {
    sql.query(`SELECT nom FROM personelle WHERE id = ${driverId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found driver: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Customer with the id
        result({ kind: "not_found" }, null);
    });
};

Driver.getDriverIdUsingNameAndLastName = (driverName,driverLastName, result) => {
    sql.query(`SELECT id_personelle FROM personelle WHERE (prenom = ${driverName} AND nom = ${driverLastName}) `, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found driver: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Customer with the id
        result({ kind: "not_found" }, null);
    });
};
