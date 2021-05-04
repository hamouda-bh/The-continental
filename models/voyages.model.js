const sql = require("./db.js");

// constructor
const Voyages = function(voyages) {
    this.id_reservation = voyages.id_reservation;
    this.pays = voyages.pays ;
    this.prix = voyages.prix ;
    this.gouvernorat = voyages.gouvernorat;
    this.date_debut = voyages.date_debut ;
    this.date_fin = voyages.date_fin ;
};

Voyages.create = (newVoyages, result) => {
    sql.query("INSERT INTO voyages SET ?", newVoyages, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created voyages: ", { id: res.insertId, ...newVoyages });
        result(null, { id: res.insertId, ...newVoyages });
    });
};


Voyages.findById = (voyageId, result) => {
    sql.query(`SELECT * FROM voyages WHERE id = ${voyageId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found hotel: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Customer with the id
        result({ kind: "not_found" }, null);
    });
};

Voyages.getAll = result => {
    sql.query("SELECT * FROM voyages", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("voyages: ", res);
        result(null, res);
    });
};

Voyages.updateById_D = (id, voyages, result) => {
var s ="";
    sql.query(`SELECT date_fin FROM voyages WHERE id = ${id}`, (err, res)=>{
        s = JSON.stringify(res);
        s=s.substring(14,24)
if(s>voyages.date_debut){
    sql.query(
        "UPDATE voyages SET date_debut = ? WHERE id = ?",
        [voyages.date_debut, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }
            if (res.affectedRows == 0) {
                // not found Customer with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated voyages: ", { id: id, ...voyages });
            result(null, { id: id, ...voyages });
        }
    );

}
else result(null,"les dates ne sont pas adéquats.");

    });};

Voyages.updateById_F = (id, voyages, result) => {
    var s ="";
    sql.query(`SELECT date_fin FROM voyages WHERE id = ${id}`, (err, res)=>{
        s = JSON.stringify(res);
        s=s.substring(14,24)
        if(s<voyages.date_fin){
    sql.query(
        "UPDATE voyages SET date_fin = ? WHERE id = ?",
        [voyages.date_fin, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found Customer with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated voyages: ", { id: id, ...voyages });
            result(null, { id: id, ...voyages });
        }
    );
}
        else result(null,"les dates ne sont pas adéquats.");

    });};
Voyages.removeId = (id, result) => {
    sql.query("DELETE FROM voyages WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found Customer with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted voyages with id: ", id);
        result(null, res);
    });
};

Voyages.removeAll = result => {
    sql.query("DELETE FROM voyages", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} voyages`);
        result(null, res);
    });
};








module.exports = Voyages;