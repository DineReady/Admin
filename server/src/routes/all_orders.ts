import { Request, Response } from "express";
import { db } from "../connection";

export default async function allOrders(req: Request, res: Response): Promise<void> {
    try {
        const orders = await db("orders").select("*");
        res.status(200).json(orders);
    } catch (error: unknown) {
        console.error((error as Error).message);
        res.status(500).send("Server error");
    }
}
