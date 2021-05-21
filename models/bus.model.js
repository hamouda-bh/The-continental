const sql = require("./db.js");
const Driver = require("../models/driver.model.js");
//constructor
const Bus = function(bus){
    this.nom = bus.nom;
    this.id_driver = bus.id_driver;
    this.driver_full_name = Driver.getDriverNameUsingId(this.id_driver) + "" + Driver.getDriverLastNameUsingId(this.id_driver);
    this.capacity = bus.capacity;
    this.minibus = bus.minibus;
    this.rent_price_per_day = bus.rent_price_per_day;
};

Bus.createBus = (newBus, result) => {
    sql.query("INSERT INTO bus SET ?",newBus,(err,res) =>{
        if(err) {
            console.log("error: ",err);
            result(err, null);
            return;
        }
        console.log("created bus: ", { id: res.insertId, ...newBus});
        result(null, {id: res.insertId, ...newBus});
    });
};

Bus.findAllBuses = result => {
    sql.query(`SELECT * FROM bus ` ,(err,res) =>{
        if(err) {
            console.log("error: ",err);
            result(err, null);
            return;
        }
        if(res.length){
            console.log("found bus: ",res);
            result(null,res);
            return;
        }
        res.render("/transport/transport",{buses:res});
    });
};

Bus.findBusById = (busId, result) => {
    sql.query(`SELECT * FROM bus WHERE id = ${busId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found bus: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Customer with the id
        result({ kind: "not_found" }, null);
    });
};

Bus.updateBusById = (busId, bus, result) => {
    sql.query(
        "UPDATE bus SET nom = ?,driver_full_name = ?,capacity = ?, minibus = ?, rent_price_per_day = ?  WHERE id = ?",
        [bus.nom, bus.driver_full_name, bus.capacity, bus.minibus, bus.rent_price_per_day, busId],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                result({ kind: "not_found" }, null);
                return;
            }
            console.log("updated bus: ", { id: busId, ...bus });
            result(null, { id: busId, ...bus });
        }
    );
};

Bus.deleteBusUsingId = (busId, result) => {
    sql.query("DELETE FROM bus WHERE id = ?", busId, (err, res) => {
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

        console.log("deleted bus with id: ", busId);
        result(null, res);
    });
};

Bus.deleteAllBuses = result => {
    sql.query("DELETE FROM bus", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} buses`);
        result(null, res);
    });
};

// Bus.deleteUsingName = (busName, result) => {
//     sql.query(`DELETE FROM bus WHERE name=?`,(req,res)=>{
//         if (err) {
//             console.log("error: ", err);
//             result(null, err);
//             return;
//         }
//
//         if (res.affectedRows == 0) {
//             // not found Customer with the id
//             result({ kind: "not_found" }, null);
//             return;
//         }
//
//         console.log("deleted bus with name: ", busId);
//         result(null, res);
//     });
// };

// Bus.findBusesWithDriverName =  (driverName, result) => {
//   sql.query(`SELECT b.nom,p.nom FROM bus AS b INNER JOIN personnelle AS p WHERE b.id_driver = {$driverName}`,(err,res)=>{
//       if(err) {
//           console.log("error: ",err);
//           result(err, null);
//           return;
//       }
//       if(res.length){
//           console.log(`found bus` ,res[0]);
//           result(null,res[0]);
//           return;
//       }
//       result({ kind: "not_found" },null);
//   });
// };

// Bus.findByCapacity = (busCapacity, result) => {
//     sql.query(`SELECT * FROM bus WHERE capacity= ${busCapacity}` ,(err,res) =>{
//         if(err) {
//             console.log("error: ",err);
//             result(err, null);
//             return;
//         }
//         if(res.length){
//             console.log("found bus: ",res[0]);
//             result(null,res[0]);
//             return;
//         }
//         result({ kind: "not_found" },null);
//     });
// };

// Bus.findByName = (busName, result) => {
//     sql.query(`SELECT * FROM bus WHERE nom= ${busName}` ,(err,res) =>{
//         if(err) {
//             console.log("error: ",err);
//             result(err, null);
//             return;
//         }
//         if(res.length){
//             console.log("found bus: ",res[0]);
//             result(null,res[0]);
//             return;
//         }
//         result({ kind: "not_found" },null);
//     });
// };

module.exports = Bus;