const express = require("express");
const cors = require("cors");
const app = express();
const mysql = require("mysql2");

app.use(cors());
app.use(express.json());

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "autoparks",
  multipleStatements: true,
});

// app.get("/", (req, res) => {
//   connection.query(
//     `SELECT * FROM transports LEFT JOIN ipasibas ON
//      transports.ipasiba = ipasibas.id
//      LEFT JOIN turetajs ON turetajs_id = turetajs
//      LEFT JOIN veids ON ipasibas.veids_id = veids.id
//      LEFT JOIN marka ON ipasibas.marka_id = marka.id
//      LEFT JOIN modelis ON ipasibas.modelis_id = modelis.id
//      LEFT JOIN motors ON ipasibas.motors_id = motors.id
//      LEFT JOIN degviela ON ipasibas.degviela_id = degviela.id
//      `

//     function (err, results, fields) {
//       console.log(results); // results contains rows returned by server
//     }
//   );
// });

app.get("/", (req, res) => {
  connection.query(
    `SELECT * FROM transports LEFT JOIN ipasibas ON 
     transports.ipasibas_id = ipasibas.id
     LEFT JOIN turetajs ON transports.turetajs_id = turetajs.id
     LEFT JOIN veids ON ipasibas.veids_id = veids.id
     LEFT JOIN marka ON ipasibas.marka_id = marka.id
     LEFT JOIN modelis ON ipasibas.modelis_id = modelis.id
     LEFT JOIN motors ON ipasibas.motors_id = motors.id
     LEFT JOIN degviela ON ipasibas.degviela_id = degviela.id
     `,

    function (err, results, fields) {
      console.log(results); // results contains rows returned by server
    }
  );
});

app.post("/", (req, res) => {
  connection.query(
    `INSERT IGNORE INTO modelis (modelis) VALUES ('${req.body.modelis}');
    motoruCheck(${req.body.tilpums},${req.body.jauda});
    adresuCheck('${req.body.pilseta}','${req.body.iela}');
    INSERT INTO ipasibas VALUES ('${req.body.veids}', '${req.body.virsbuve}','${req.body.sedvietas}', '${req.body.krasa}','${req.body.gads}', '${req.body.marka}','${req.body.modelis}','(SELECT id FROM motors WHERE tilpums = ${req.body.tilp_mot} AND jauda = ${req.body.jauda_mot}), '${req.body.degviela})');
    INSERT INTO transports VALUES ('${req.body.apl_nr}','${req.body.numurzime}','${req.body.vin}', '${req.body.tips_nr}', 
    '(SELECT id FROM turetajs WHERE pilseta = ${req.body.pilseta} AND iela = ${req.body.iela})', 
    '(SELECT id from ipasibas WHERE veids=${req.body.veids}, virsbuve=${req.body.virsbuve}, sedvietas = ${req.body.sedvietas}, krasa = ${req.body.krasa}), gads = ${req.body.gads}, marka_id =${req.body.marka}, modelis_id = ${req.body.modelis}, motors_id${req.body.motors})' )`,

    // `INSERT IGNORE INTO modelis (modelis) VALUES ('${req.body.modelis}');
    // motoruCheck(${req.body.tilpums},${req.body.jauda});
    // adresuCheck('${req.body.pilseta}','${req.body.iela}');
    // INSERT INTO ipasibas VALUES ('${req.body.veids}', '${req.body.virsbuve}','${req.body.sedvietas}', '${req.body.krasa}','${req.body.gads}', '${req.body.marka}','${req.body.modelis}','(SELECT id FROM motors WHERE tilpums = ${req.body.tilp_mot} AND jauda = ${req.body.jauda_mot}), '${req.body.degviela})');
    // INSERT INTO transports VALUES ('${req.body.apl_nr}','${req.body.numurzime}','${req.body.vin}', '${req.body.tips_nr}',
    // '(SELECT id FROM turetajs WHERE pilseta = ${req.body.pilseta} AND iela = ${req.body.iela})',
    // '(SELECT id from ipasibas WHERE veids=${req.body.veids}, virsbuve=${req.body.virsbuve}, sedvietas = ${req.body.sedvietas}, krasa = ${req.body.krasa}), gads = ${req.body.gads}, marka_id =${req.body.marka}, modelis_id = ${req.body.modelis}, motors_id${req.body.motors})' )`,
    // `INSERT IGNORE INTO modelis (modelis) VALUES ('${req.body.modelis}');
    // motoruCheck(${req.body.tilpums},${req.body.jauda});
    // adresuCheck('${req.body.pilseta}','${req.body.iela}');
    // INSERT INTO ipasibas VALUES ('${req.body.veids}', '${req.body.virsbuve}','${req.body.sedvietas}', '${req.body.krasa}','${req.body.gads}', '${req.body.marka}','${req.body.modelis}','(SELECT id FROM motors WHERE tilpums = ${req.body.tilp_mot} AND jauda = ${req.body.jauda_mot}), '${req.body.degviela})');
    // INSERT INTO transports VALUES ('${req.body.apl_nr}','${req.body.numurzime}','${req.body.vin}', '${req.body.tips_nr}',
    // '(SELECT id FROM turetajs WHERE pilseta = ${req.body.pilseta} AND iela = ${req.body.iela})',
    // '(SELECT id from ipasibas WHERE veids=${req.body.veids}, virsbuve=${req.body.virsbuve}, sedvietas = ${req.body.sedvietas}, krasa = ${req.body.krasa}), gads = ${req.body.gads}, marka_id =${req.body.marka}, modelis_id = ${req.body.modelis}, motors_id${req.body.motors})' )`,

    `INSERT IGNORE INTO modelis (modelis) VALUES ('${req.body.modelis}');
    motoruCheck(${req.body.tilpums},${req.body.jauda});
    adresuCheck('${req.body.pilseta}','${req.body.iela}');
    INSERT INTO ipasibas VALUES ('${req.body.veids}', '${req.body.virsbuve}','${req.body.sedvietas}', '${req.body.krasa}','${req.body.gads}', '${req.body.marka}','${req.body.modelis}','(SELECT id FROM motors WHERE tilpums = ${req.body.tilp_mot} AND jauda = ${req.body.jauda_mot}), '${req.body.degviela})');
    INSERT INTO transports VALUES ('${req.body.apl_nr}','${req.body.numurzime}','${req.body.vin}', '${req.body.tips_nr}', 
    '(SELECT id FROM turetajs WHERE pilseta = ${req.body.pilseta} AND iela = ${req.body.iela})', 
    '(SELECT id from ipasibas WHERE veids=${req.body.veids}, virsbuve=${req.body.virsbuve}, sedvietas = ${req.body.sedvietas}, krasa = ${req.body.krasa}), gads = ${req.body.gads}, marka_id =${req.body.marka}, modelis_id = ${req.body.modelis}, motors_id${req.body.motors})' )`,

    function (err, results, fields) {
      console.log(results); // results contains rows returned by server
    }
  );
});

app.listen(8001, () => {
  console.log("deez nuts!");
});
