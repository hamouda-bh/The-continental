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

module.exports = Voyages;