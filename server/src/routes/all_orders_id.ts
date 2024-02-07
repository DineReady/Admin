import { Request, Response } from "express";
import { Database, Statement } from "sqlite3";

export default async function allOrdersId(
    req: Request,
    res: Response,
    db: Database,
): Promise<void> {
    try {
        db.all(
            "SELECT id FROM orders",
            (err: Error | null, rows: Statement) => {
                if (err) {
                    console.error(err.message);
                    res.status(500).send("Server error");
                }
                res.json(rows);
            },
        );
    } catch (error: unknown) {
        console.error((error as Error).message);
        res.status(500).send("Server error");
    } finally {
        db.close((err: Error | null) => {
            if (err) console.error(err.message);
            console.log("[server] Database connection closed");
        });
    }
}
