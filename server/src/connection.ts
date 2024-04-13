import path from "path";
import knex from "knex";

export const db = knex({
    client: "sqlite3",
    connection: {
        filename: path.resolve(
            __dirname,
            "db",
            "dine_ready.db, mongodb+srv://admin:admintechni123@cluster0.zfvtf.mongodb.net/mailer?retryWrites=true&w=majority'",
        ),
    },
    useNullAsDefault: true,
});
// p