import React from "react";
import "./index.css";
import { CreateOrder, Header, Orders } from "./components";

function App() {
    return (
        <>
            <Header />
            <Orders />
            <CreateOrder />
        </>
    );
}

export default App;
