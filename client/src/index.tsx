import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import ReactDOM, { Root } from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { KindeProvider } from "@kinde-oss/kinde-auth-react";

const root: Root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
    <KindeProvider
        clientId="4f2cabe28e574ae2b291b275bcaa0867"
        domain="https://dineready.kinde.com"
        redirectUri="http://localhost:3000"
        logoutUri="http://localhost:3000"
    >
        <ChakraProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<App />} />
                </Routes>
            </BrowserRouter>
        </ChakraProvider>
    </KindeProvider>,
);

reportWebVitals();
