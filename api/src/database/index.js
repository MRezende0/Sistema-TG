import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

async function dbConnect() {
  if (global.dbConnection && global.dbConnection.state !== "disconnected")
    return global.dbConnection;

  const DB_USERNAME = process.env.DB_USERNAME;
  const DB_PASSWORD = process.env.DB_PASSWORD;
  const DB_HOST = process.env.DB_HOST;
  const DB_PORT = process.env.DB_PORT;
  const DB_DATABASE = process.env.DB_DATABASE;

  const dbConnection = mysql.createConnection({
    user: DB_USERNAME,
    password: DB_PASSWORD,
    host: DB_HOST,
    port: DB_PORT,
    database: DB_DATABASE,
  });
  global.dbConnection = dbConnection;
  return dbConnection;
};

export default dbConnect;
