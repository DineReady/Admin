import { Request, Response } from "express";
import { db } from "../connection";

export default async function deleteOrder(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    try {
        await db("orders").where({ id }).delete();
        res.status(200).send({ message: "Order has been deleted" });
    } catch (error) {
        res.status(500).send({ message: "Error deleting order" });
    }
}
