import { Request, Response } from "express";
import { db } from "../connection";
import { Order, OrderStatusUpdate } from "../../types";

export default async function updateState(req: Request, res: Response): Promise<void> {
    const { id, destination }: OrderStatusUpdate = req.body;

    try {
        await db<Order>("orders").where({ id }).update({ status: destination });

        console.log(`[server] Order with ID ${id} updated`);
        res.status(200).send("Order updated");
    } catch (error: unknown) {
        console.error((error as Error).message);
        res.status(500).send("Server error");
    }
}
