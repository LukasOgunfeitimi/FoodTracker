const mysql = require('mysql2');

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "lukas",
  database: "fooddb"
});

con.connect(start);

function start() {
    con.query("insert into foods (name, calories, protein, carbs, fat) values ('baton', 550, 20, 100, 1);", function (err, result) {
        if (err) throw err;
        console.log(result);
      });
}