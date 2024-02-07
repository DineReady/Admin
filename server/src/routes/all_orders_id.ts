/* eslint-disable quotes */
import { Request, Response } from "express";
import { Statement } from "sqlite3";
import { OrderStatus } from "../../types";
import { db } from "../db";

export default async function allOrdersId(
    req: Request,
    res: Response,
): Promise<void> {
    try {
        // Dynamic import for nanoid
        import("nanoid").then((nanoidModule) => {
            const { nanoid } = nanoidModule;

            insertOrder(nanoid)
                .then((statement: Statement) => {
                    statement.finalize((err: Error | null) => {
                        if (err) throw err;
                        res.status(201).send("Order created");
                    });
                })
                .catch((error: unknown) => {
                    console.error((error as Error).message);
                    res.status(500).send("Server error");
                })
                .finally(() => {
                    db.close((err: Error | null) => {
                        if (err) console.error(err.message);
                        console.log("[server] Database connection closed");
                    });
                });
        });
    } catch (error: unknown) {
        console.error((error as Error).message);
        res.status(500).send("Server error");
    }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function insertOrder(nanoid: any): Promise<Statement> {
    const id: string = nanoid(6);
    const status: string = OrderStatus.Pending;

    const all_orders_id_query: string = `SELECT id FROM orders WHERE id = '${id}'`;

    const all_orders_id = await new Promise((resolve, reject) => {
        db.all(all_orders_id_query, (err, rows) => {
            if (err) reject(err);
            resolve(rows);
        });
    });

    if (all_orders_id) return insertOrder(nanoid);
    else {
        const insert_order_query: string = `INSERT INTO orders (id, status) VALUES ('${id}', '${status}')`;

        return new Promise((resolve, reject): void => {
            db.run(insert_order_query, (err) => {
                if (err) reject(err);
                else resolve(
                    db.prepare(
                        `SELECT * FROM orders WHERE id = '${id}'`
                    )
                );
            });
        });
    }
}
