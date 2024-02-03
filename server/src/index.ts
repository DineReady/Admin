import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();
const port: number = 8080;

app.get("/api", (req: Request, res: Response) => {
    res.send("Hello World!");
});

app.get("/huj", (req: Request, res: Response) => {
    res.send("Huj!");
});

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
