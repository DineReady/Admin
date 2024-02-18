import path from "path";
import knex from "knex";

export const db = knex({
    client: "sqlite3",
    connection: {
        filename: path.resolve(__dirname, "db", "dine_ready.db"),
    },
    useNullAsDefault: true,
});
