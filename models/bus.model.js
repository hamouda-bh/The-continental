const sql = require("./db.js");

//constructor
const Bus = function(bus){
    this.nom = bus.nom;
    this.id_chauffeur = bus.id_chauffeur;
    this.capacite = bus.capacite;
    this.minibus = bus.minibus;
    this.prix_location_jour = bus.prix_location_jour;
};

Bus.create = (newBus, result) => {
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

Bus.findAll = result => {
    sql.query(`SELECT * FROM bus ` ,(err,res) =>{
        if(err) {
            console.log("error: ",err);
            result(err, null);
            return;
        }
        if(res.length){
            console.log("found bus: ",res[0]);
            result(null,res[0]);
            return;
        }
        result({ kind: "not_found" },null);
    });
};

Bus.findById = (busId, result) => {
    sql.query(`SELECT * FROM bus WHERE id= ${busId}` ,(err,res) =>{
        if(err) {
            console.log("error: ",err);
            result(err, null);
            return;
        }
        if(res.length){
            console.log("found bus: ",res[0]);
            result(null,res[0]);
            return;
        }
        result({ kind: "not_found" },null);
    });
};

Bus.findByName = (nomBus, result) => {
    sql.query(`SELECT * FROM bus WHERE nom= ${nomBus}` ,(err,res) =>{
        if(err) {
            console.log("error: ",err);
            result(err, null);
            return;
        }
        if(res.length){
            console.log("found bus: ",res[0]);
            result(null,res[0]);
            return;
        }
        result({ kind: "not_found" },null);
    });
};

Bus.findByCapacity = (busCapacity, result) => {
    sql.query(`SELECT * FROM bus WHERE capacite= ${busCapacity}` ,(err,res) =>{
        if(err) {
            console.log("error: ",err);
            result(err, null);
            return;
        }
        if(res.length){
            console.log("found bus: ",res[0]);
            result(null,res[0]);
            return;
        }
        result({ kind: "not_found" },null);
    });
};

Bus.findBusesWithDriverName =  result =>{
  sql.query(`SELECT b.nom,p.nom FROM bus AS b INNER JOIN personnelle AS p WHERE b.id_chauffer = p.id`,(err,res)=>{
      if(err) {
          console.log("error: ",err);
          result(err, null);
          return;
      }
      if(res.length){
          console.log("found bus: ",res[0]);
          result(null,res[0]);
          return;
      }
      result({ kind: "not_found" },null);
  });
};

Bus.deleteUsingId = (busId,result) =>{
    sql.query(`DELETE FROM bus WHERE id=?`,(req,res)=>{
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

Bus.deleteUsingName = (nomBus,result) =>{
    sql.query(`DELETE FROM bus WHERE id=?`,(req,res)=>{
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

        console.log("deleted bus with name: ", busId);
        result(null, res);
    });
};

Bus.deleteAll = result => {
    sql.query(`DELETE * FROM bus`, (err,res)=>{
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} bus`);
        result(null, res);
    });
}
