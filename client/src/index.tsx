import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import dotenv from "dotenv";
import { ClerkProvider } from "@clerk/clerk-react";
dotenv.config({ path: ".env" });

const PUBLISHABLE_KEY = process.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
    throw new Error("Missing Publishable Key");
}

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
        <ChakraProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/orders" element={<App />} />
                </Routes>
            </BrowserRouter>
        </ChakraProvider>
    </ClerkProvider>,
);

reportWebVitals();
