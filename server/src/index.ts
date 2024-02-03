/* eslint-disable quotes */
import express, { Express, Request, Response } from "express";
import sqlite, { Database } from "sqlite3";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import path from "path";

dotenv.config();
sqlite.verbose();

const app: Express = express();
const port: number = 8080;
const dbPath: string = path.resolve(__dirname, "db", "dine_ready.db");

// CONNECT TO DATABASE
const db: Database = new sqlite.Database(
    dbPath,
    sqlite.OPEN_READWRITE,
    (err: Error | null) => {
        if (err) console.error(err.message);
        else console.log("[server] Connected to the dine_ready database");
    },
);

// CREATE TABLES
const sql = `CREATE TABLE IF NOT EXISTS orders (id INTEGER PRIMARY KEY, status TEXT)`;
db.run(sql, (err: Error | null) => {
    if (err) console.error(err.message);
    else console.log("[server] Table created");
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

app.get("/api", (req: Request, res: Response) => {
    res.send("Hello World!");
});

app.listen(port, () => {
    console.log(`[server] Server is running at http://localhost:${port}`);
});

//TODO: proxy in FE doesnt work
