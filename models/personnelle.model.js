const sql = require("./db.js");

// constructor
const Personnelle = function(personnelle) {
    this.nom = personnelle.nom ;
    this.prenom = personnelle.prenom;
    this.age = personnelle.age ;
    this.fonction=personnelle.fonction;
    this.salaire=personnelle.salaire;
    this.date_debut_contrat=personnelle.date_debut_contrat;
    this.date_fin_contrat=personnelle.date_fin_contrat;
};

Personnelle.create = (newPersonnelle, result) => {
    sql.query("INSERT INTO personnelle SET ?", newPersonnelle, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created personnelle: ", { id: res.insertId, ...newPersonnelle });
        result(null, { id: res.insertId, ...newPersonnelle});
    });
};

Personnelle.findById = (personnelleId, result) => {
    sql.query(`SELECT * FROM personnelle WHERE id = ${personnelleId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found personnelle: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Customer with the id
        result({ kind: "not_found" }, null);
    });
};
Personnelle.getAll = result => {
    sql.query("SELECT * FROM personnelle", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("personnels: ", res);
        result(null, res);
    });
};


Personnelle.updateById = (id, personnelle, result) => {
    sql.query(
        "UPDATE personnelle SET nom = ?, prenom = ?, age = ? , fonction = ? , salaire = ? ,date_debut_contrat = ? , date_fin_contrat = ?  WHERE id = ?",
        [personnelle.nom, personnelle.prenom, personnelle.age,personnelle.fonction,personnelle.salaire,personnelle.date_debut_contrat,personnelle.date_fin_contrat, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found personnel with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated personnel: ", { id: id, ...personnelle });
            result(null, { id: id, ...personnelle });
        }
    );
};
Personnelle.remove = (id, result) => {
    sql.query("DELETE FROM personnelle WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found personnel with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted personnel with id: ", id);
        result(null, res);
    });
};
module.exports = Personnelle;
