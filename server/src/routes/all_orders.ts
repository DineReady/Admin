import { Request, Response } from "express";
import { Statement } from "sqlite3";
import { db } from "../db";

export default async function allOrders(
    req: Request,
    res: Response,
): Promise<void> {
    try {
        db.all("SELECT * FROM orders", (err: Error | null, rows: Statement) => {
            if (err) {
                console.error(err.message);
                res.status(500).send("Server error");
            }
            res.json(rows);
        });
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
