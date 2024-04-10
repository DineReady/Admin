/* eslint-disable quotes */
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import { allOrders, createOrder, deleteOrder, orderDetails, updateState, validateOrderId } from "./routes";

dotenv.config({ path: ".env" });
const app: Express = express();
const PORT: number = 8080;
const mongoose = require("mongoose");
const usersApi = require("./server/users");
const loginApi = require("./server/login");

const db = "mongodb+srv://admin:admintechni123@cluster0.zfvtf.mongodb.net/mailer?retryWrites=true&w=majority";

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on("connected", () => {
    console.log("Connected with database");
});
{
    /* ============================= MIDDLEWARE ========================== */
}
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(usersApi);
app.use(loginApi);

{
    /* ============================= ROUTES ============================= */
}
app.get("/orders", (req: Request, res: Response): Promise<void> => allOrders(req, res));
app.get("/orders/create", (req: Request, res: Response): Promise<void> => createOrder(req, res));
app.get("/orders/validate/:id", (req: Request, res: Response): Promise<void> => validateOrderId(req, res));
app.get("/orders/:id", (req: Request, res: Response): Promise<void> => orderDetails(req, res));
app.post("/orders/update-state", (req: Request, res: Response): Promise<void> => updateState(req, res));
app.delete("/orders/delete/:id", (req: Request, res: Response): Promise<void> => deleteOrder(req, res));

app.listen(PORT, (): void => console.log(`\n[server] Server is running at http://localhost:${PORT}`));
