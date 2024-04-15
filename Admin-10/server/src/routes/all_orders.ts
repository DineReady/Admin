import { Request, Response } from "express";
import { db } from "../connection";
import { Order } from "../../types";

export default async function allOrders(req: Request, res: Response): Promise<void> {
    try {
        res.status(200).json((await db("orders").select("*")) as Order[]);
    } catch (error: unknown) {
        console.error((error as Error).message);
        res.status(500).send("Server error");
    }
}
