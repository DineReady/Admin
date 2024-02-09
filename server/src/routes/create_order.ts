import { Request, Response } from "express";
import { db } from "../db";
import { v4 as uuidv4 } from "uuid";

export default async function createOrder(req: Request, res: Response): Promise<void> {
    let uniqueId: string = uuidv4();

    try {
        const all_id_orders_query: string = "SELECT id FROM orders";
        db.all(all_id_orders_query, async (err: Error | null, rows: { id: string }[]) => {
            if (err) {
                throw err;
            }
            const existingOrderIds: string[] = rows.map((row: { id: string }) => row.id);
            let isUnique = !existingOrderIds.includes(uniqueId);

            while (!isUnique) {
                uniqueId = uuidv4();
                isUnique = !existingOrderIds.includes(uniqueId);
            }

            db.run("INSERT INTO orders (id, status) VALUES (?, ?)", [uniqueId, "pending"], (err: Error | null) => {
                if (err) throw `Error inserting order: ${err.message}`;
                console.log(`[server] Order with ID ${uniqueId} inserted`);
            });
            res.status(200).json({ uniqueId });
        });
    } catch (error: unknown) {
        console.error((error as Error).message);
        res.status(500).send("Server error");
    }
}
