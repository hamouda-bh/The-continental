const sql = require("./db.js");

//constructor
const Bus = function(bus){
    this.nom = bus.nom;
    this.id_chauffer = bus.id_chauffer;
    this.capacite = bus.capacite;
    this.minibus = bus.minibus;
    this.prix_location_jour = bus.prix_location_jour;
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
        result({ kind: "not_found" },null);
    });
};

Bus.findBusById = (busId, result) => {
    sql.query(`SELECT * FROM bus WHERE id=?`,busId,(err,res) =>{
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
        result({ kind: "not_found" },null);
    });
};

Bus.updateBusById = (id, bus, result) => {
    sql.query(
        "UPDATE bus SET nom = ?,id_chauffeur = ?,capacite = ?, minibus = ?, prix_location_jour = ?,  WHERE id = ?",
        [bus.nom, bus.id_chauffer, bus.capacite, bus.minibus, bus.prix_location_jour, id],
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
            console.log("updated bus: ", { id: id, ...bus });
            result(null, { id: id, ...bus });
        }
    );
};

Bus.deleteBusUsingId = (busId, result) => {
    sql.query(`DELETE FROM bus WHERE id=?`,busId,(req,res)=>{
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
    sql.query(`DELETE * FROM bus`, (err,res)=>{
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} bus`);
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
//   sql.query(`SELECT b.nom,p.nom FROM bus AS b INNER JOIN personnelle AS p WHERE b.id_chauffer = {$driverName}`,(err,res)=>{
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
//     sql.query(`SELECT * FROM bus WHERE capacite= ${busCapacity}` ,(err,res) =>{
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