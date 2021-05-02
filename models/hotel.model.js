const sql = require("./db.js");

// constructor
const Hotel = function(hotel) {
    this.name = hotel.name;
    this.gouvernorat = hotel.gouvernorat;
    this.nbr_chambre_double = hotel.nbr_chambre_double ;
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
};*/

Hotel.remove = (id, result) => {
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