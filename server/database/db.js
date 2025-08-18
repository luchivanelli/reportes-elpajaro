import mysql2 from 'mysql2';
import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

// export const connection = mysql2.createConnection({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASS,
//     database: process.env.DB_NAME,
// });

// export const connection = mysql2.createConnection({
//     host: "bpa1yxhjhwbhnuhuzze4-mysql.services.clever-cloud.com",
//     user: "unhiiswmbyubs4bl",
//     password: "ijgEm88w3fV3SXNDwkF5",
//     database: "bpa1yxhjhwbhnuhuzze4",
// });


const pool = mysql.createPool({
  host: "bpa1yxhjhwbhnuhuzze4-mysql.services.clever-cloud.com",
  user: "unhiiswmbyubs4bl",
  password: "ijgEm88w3fV3SXNDwkF5",
  database: "bpa1yxhjhwbhnuhuzze4",
  waitForConnections: true,
  connectionLimit: 5, // no más de 5 porque es tu límite
  queueLimit: 0
});

export default pool;
