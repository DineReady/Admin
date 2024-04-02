import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { db } from "../connection";
import { Order } from "../../types";

export default async function createOrder(req: Request, res: Response): Promise<void> {
    let uniqueId: string = uuidv4();

    try {
        const existingOrderIds: string[] = await db("orders")
            .select("id")
            .then((orders: Order[]): string[] => orders.map((order: Order) => order.id));
        let isUnique: boolean = !existingOrderIds.includes(uniqueId);
        while (!isUnique) {
            uniqueId = uuidv4();
            isUnique = !existingOrderIds.includes(uniqueId);
        }

        await db("orders").insert({ id: uniqueId, status: "pending" });
        res.status(200).json({ uniqueId });
    } catch (error: unknown) {
        console.error((error as Error).message);
        res.status(500).send("Server error");
    }
}
