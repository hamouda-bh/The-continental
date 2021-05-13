const sql = require("./db.js");

// constructor
const Hotel = function(hotel) {
    this.name = hotel.name;
    this.gouvernorat = hotel.gouvernorat;
    this.nbr_chambre_double = hotel.nbr_chambre_double ;
    this.nbr_chambre_single=hotel.nbr_chambre_single;
    this.nbr_chambre_triple=hotel.nbr_chambre_triple;
    this.prix_nuit_single=hotel.prix_nuit_single;
    this.prix_nuit_double=hotel.prix_nuit_double;
    this.prix_nuit_triple=hotel.prix_nuit_triple;
};

Hotel.create = (newHotel, result) => {
    sql.query("INSERT INTO hotel SET ?", newHotel, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created hotel: ", { id: res.insertId, ...newHotel });
        result(null, { id: res.insertId, ...newHotel });
    });
};

Hotel.findById = (hotelId, result) => {
    sql.query(`SELECT * FROM hotel WHERE id = ${hotelId}`, (err, res) => {
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

Hotel.findByGouv = (gouvernorat, result) => {
    sql.query(`SELECT * FROM hotel WHERE gouvernorat = ?`,gouvernorat, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found hotel: ", res);
            result(null, res);
            return;
        }

        // not found Customer with the id
        result({ kind: "not_found" }, null);
    });
};

Hotel.findPromos = (name,date, result) => {
    var retour =[];
    sql.query(`SELECT * FROM hotel WHERE name = ?`,name, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
    if (((new Date(date)).getMonth()==6) || ((new Date(date)).getMonth()==7)) {
        for (const item of res) {
        retour.push({
            id : item.id,
            name: item.name,
            gouvernorat :item.gouvernorat,
            prix_nuit_single: item.prix_nuit_single + item.prix_nuit_single*10/100,
            prix_nuit_double: item.prix_nuit_double + item.prix_nuit_double*10/100,
            prix_nuit_triple: item.prix_nuit_triple + item.prix_nuit_triple*10/100
        })

    }
     if (res.length) {
         console.log("found hotel: ", retour);
         result(null, retour);
         return;
     }
 }else if (((new Date(date)).getMonth()==8)|| ((new Date(date)).getMonth()==9))
 {
     for (const x of res)
     {
         retour.push({
             id: item.id,
             name: item.name,
             gouvernorat :item.gouvernorat,
             prix_nuit_single: x.prix_nuit_single - x.prix_nuit_single*10/100,
             prix_nuit_double: x.prix_nuit_double - x.prix_nuit_double*10/100,
             prix_nuit_triple: x.prix_nuit_triple - x.prix_nuit_triple*10/100
         })
     }
     if (res.length) {
         console.log("found hotel: ", retour);
         result(null, retour);
         return;
     }
 }
     if (res.length) {
            console.log("found hotel: ", res);
            result(null, res);
            return;
        }
        result({ kind: "not_found" }, null);
    });
};

Hotel.findByNuitSingle = (name, result) => {
    sql.query(`SELECT prix_nuit_single FROM hotel WHERE name = ? `,name, (err, res) => {
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
        result({ kind: "not_found" }, null);
    });
};

Hotel.findByNuitDouble = (name, result) => {
    sql.query(`SELECT prix_nuit_double FROM hotel WHERE name = ? `,name, (err, res) => {
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
        result({ kind: "not_found" }, null);
    });
};

Hotel.findByNuitTriple= (name, result) => {
    sql.query(`SELECT prix_nuit_triple FROM hotel WHERE name = ? `,name, (err, res) => {
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
        result({ kind: "not_found" }, null);
    });
};

Hotel.getAll = result => {
    sql.query("SELECT * FROM hotel", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("hotels: ", res);
      result(null, res);
    });
};

/*
Hotel.updateById = (id, hotel, result) => {
    sql.query(
        "UPDATE hotel SET name = ?, gouvernorat = ?, nbr_chambre_double = ? WHERE id = ?",
        [customer.email, customer.name, customer.active, id],
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

            console.log("updated customer: ", { id: id, ...customer });
            result(null, { id: id, ...customer });
        }
    );
};
*/

Hotel.removeId = (id, result) => {
    sql.query("DELETE FROM hotel WHERE id = ?", id, (err, res) => {
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

        console.log("deleted hotel with id: ", id);
        result(null, res);
    });
};

Hotel.removeName = (name, result) => {
    sql.query("DELETE FROM hotel WHERE name = ?", name, (err, res) => {
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

        console.log("deleted hotel with name: ", name);
        result(null, res);
    });
};

Hotel.removeAll = result => {
    sql.query("DELETE FROM hotel", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} hotels`);
        result(null, res);
    });
};

module.exports = Hotel;