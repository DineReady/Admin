/* eslint-disable quotes */
import express, { Express, Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { allOrders, allOrdersId } from "./routes";
import { db, sql } from "./db";

dotenv.config();
const app: Express = express();
const PORT: number = 8080;

db.run(sql, (err: Error | null): void => {
    if (err) console.error(err.message);
    console.log('[server] Table "orders" exists or was created successfully');
});

{
    /* ============================= MIDDLEWARE ========================== */
}
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

{
    /* ============================= ROUTES ============================= */
}
app.get("/orders", (req: Request, res: Response) => allOrders(req, res));
app.get("/orders/id", (req: Request, res: Response) => allOrdersId(req, res));

app.listen(PORT, (): void =>
    console.log(`[server] Server is running at http://localhost:${PORT}`),
);
