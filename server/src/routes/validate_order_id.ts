import { Request, Response } from "express";
import { db } from "../connection";
import { Order } from "../../types";

export default async function validateOrderId(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const order_id: string = id;

    try {
        res.status(200).json(
            (await db("orders").select("id")).map((order: Order): string => order.id).includes(order_id) &&
                order_id.length
                ? true
                : false,
        );
    } catch (error) {
        console.error((error as Error).message);
        res.status(500).send("Server error");
    }
}
