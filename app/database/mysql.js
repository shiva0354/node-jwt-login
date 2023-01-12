import { createConnection } from "mysql2";
import database from "../config/database.js";

const params = {
    host: database.host,
    port: database.port,
    user: database.username,
    database: database.database,
    password: database.password
}

const pool = createConnection(params)

const connection = pool.promise()

// connection.getConnection(function (err) {
//     if (err) throw err;
//     // console.log("Database Connected!");
// });

export default connection