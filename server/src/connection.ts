import path from "path";
import knex from "knex";

const db_file_name: string = "dine_ready.db";
const db_dir_name: string = "db";
const db_path: string = path.resolve(__dirname, db_dir_name, db_file_name);

export const db = knex({
    client: "sqlite3",
    connection: {
        filename: db_path,
    },
    useNullAsDefault: true,
});
