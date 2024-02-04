/* eslint-disable quotes */
import express, { Express, Request, Response } from "express";
import sqlite, { Database } from "sqlite3";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import path from "path";

dotenv.config();
sqlite.verbose();

const db_file_name: string = "dine_ready.db";
const db_dir_name: string = "db";
const app: Express = express();
const PORT: number = 8080;
const db_path: string = path.resolve(__dirname, db_dir_name, db_file_name);
const db: Database = new sqlite.Database(
    db_path,
    sqlite.OPEN_READWRITE,
    (err: Error | null): void => {
        if (err) console.error(err.message);
        console.log(`[server] Connected to the ${db_file_name}`);
    },
);
const sql: string = `CREATE TABLE IF NOT EXISTS orders (id INTEGER PRIMARY KEY, status TEXT)`;

db.run(sql, (err: Error | null): void => {
    if (err) console.error(err.message);
    console.log("[server] Table created");
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

app.get("/api", (req: Request, res: Response): void => {
    res.send("Hello World!");
});

app.listen(PORT, (): void => {
    console.log(`[server] Server is running at http://localhost:${PORT}`);
});

//TODO: proxy in FE doesnt work
