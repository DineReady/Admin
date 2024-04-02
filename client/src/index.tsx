import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
    <ChakraProvider>
        <BrowserRouter>
            <Routes>
                <Route path="/orders" element={<App />} />
            </Routes>
        </BrowserRouter>
    </ChakraProvider>,
);

reportWebVitals();
