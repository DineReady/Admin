/* eslint-disable quotes */
import express, { Express, Request, Response } from "express";
import sqlite, { Database } from "sqlite3";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import path from "path";
import { sql } from "./db/temp_queries";
import { allOrders } from "./routes";

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

db.run(sql, (err: Error | null): void => {
    if (err) console.error(err.message);
    console.log('[server] Table "orders" exists or was created successfully');
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

app.get("/orders", (req: Request, res: Response) => allOrders(req, res, db));

app.listen(PORT, (): void =>
    console.log(`[server] Server is running at http://localhost:${PORT}`),
);
