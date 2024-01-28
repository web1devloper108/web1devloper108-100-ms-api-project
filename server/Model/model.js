const mysql = require('mysql');
const connection = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  port: "3306",
  database: "ecombazaar"
});

connection.connect(function (err) {
  if (err) {
    console.log("error", err.sqlMessage);
  } else {
    console.log("Database Connection Established");
  }
});

const promisifiedQuery = (sql, values) => {
  return new Promise((resolve, reject) => {
    connection.query(sql, values, (error, results, fields) => {
      if (error) {
        reject(error);
      } else {
        resolve({ results, fields });
      }
    });
  });
};

module.exports = {
  connection,
  promisifiedQuery,
};
