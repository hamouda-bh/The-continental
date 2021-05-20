const sql = require("./db.js");

// constructor
const Circuit = function(circuit) {
    this.nom = circuit.nom;
    this.depart = circuit.depart;
    this.arrive = circuit.arrive;
    this.longeur = circuit.longeur;
    this.duree = circuit.duree;

};

Circuit.create = (newCircuit, result) => {
    sql.query("INSERT INTO circuit SET ?", newCircuit, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created circuit: ", { id: res.insertId, ...newCircuit });
        result(null, { id: res.insertId, ...newCircuit });
    });
};

Circuit.findById = (circuitId, result) => {
    sql.query(`SELECT * FROM circuit WHERE id = ${circuitId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found circuit: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Customer with the id
        result({ kind: "not_found" }, null);
    });
};

Circuit.getAll = result => {
    sql.query("SELECT * FROM circuit", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("circuits: ", res);
        result(null, res);
    });
};

Circuit.updateById = (id, circuit, result) => {
    sql.query(
        "UPDATE circuit SET longeur=?,duree=? WHERE id = ?",
        [circuit.longeur,circuit.duree, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found Circuit with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated circuit: ", { id: id, ...circuit });
            result(null, { id: id, ...circuit });
        }
    );
};

Circuit.remove = (id, result) => {
    sql.query("DELETE FROM circuit WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found Circuit with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted circuit with id: ", id);
        result(null, res);
    });
};

Circuit.removeAll = result => {
    sql.query("DELETE FROM circuit", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} circuits`);
        result(null, res);
    });
};

module.exports = Circuit;