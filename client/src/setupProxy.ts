import { createProxyMiddleware } from "http-proxy-middleware";
import { Express } from "express";

export default function (app: Express) {
    app.use(
        ["/orders"],
        createProxyMiddleware({
            target: "http://localhost:8080",
            changeOrigin: true,
        }),
    );
}
