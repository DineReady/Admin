import { Request, Response } from "express";
import { db } from "../connection";
import { Order } from "../../types";

export default async function orderDetails(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const order_id: string = id;

    try {
        const order: Order[] = await db("orders").where({ id: order_id }).select("*");
        res.status(200).json(order[0]);
    } catch (error) {
        console.error((error as Error).message);
        res.status(500).send("Server error");
    }
}
