import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { db } from "../db";

export default async function createOrder(req: Request, res: Response): Promise<void> {
    let uniqueId: string = uuidv4();

    try {
        db.all("SELECT id FROM orders", async (err: Error | null, rows: { id: string }[]) => {
            if (err) {
                console.error(err.message);
                return res.status(500).send(err);
            }

            const existingOrderIds: string[] = rows.map((row: { id: string }) => row.id);
            let isUnique = !existingOrderIds.includes(uniqueId);

            while (!isUnique) {
                uniqueId = uuidv4();
                isUnique = !existingOrderIds.includes(uniqueId);
            }

            // db.run("INSERT INTO orders (id, status) VALUES (?, ?)", [uniqueId, "pending"], (err: Error | null) => {
            //     if (err) {
            //         console.error(err.message);
            //         return res.status(500).send(err);
            //     }
            //     console.log(`[server] Order with ID ${uniqueId} added`);
            //     res.status(200).json({ uniqueId });
            // });
        });
    } catch (error: unknown) {
        console.error((error as Error).message);
        res.status(500).send(error);
    }
}
