import mysql from "mysql2";
import "dotenv/config";

const connection = mysql.createPool({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database,
    port: "3306",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})

connection.getConnection((err, connect) => {
    if (err){
        console.log("erro ao se conectar com o Banco de Dados", err)
        return;
    }

    console.log("Conectado com o Banco de Dados Mysql, com o ID: ", connect.threadId)
    return connect.release()
})

export const db = connection.promise()