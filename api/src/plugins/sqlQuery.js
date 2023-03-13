import dbConnection from "../database/index.js";

export default function sqlQuery(query, data) {
  return new Promise((resolve, reject) => {
    dbConnection().then((db) => {
      db.query(query, data, (err, res) => {
        if (err) reject(err);
        resolve(res);
      });
    });
  });
}
