import path from "path";
import { Database, OPEN_READWRITE } from "sqlite3";
import sqlite from "sqlite3";

sqlite.verbose();

const db_file_name: string = "dine_ready.db";
const db_dir_name: string = "db";
const db_path: string = path.resolve(__dirname, db_dir_name, db_file_name);

export const db: Database = new sqlite.Database(
    db_path,
    OPEN_READWRITE,
    (err: Error | null): void => {
        if (err) console.error(err.message);
        console.log(`[server] Connected to the ${db_file_name}`);
    },
);
