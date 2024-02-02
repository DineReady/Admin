import React from "react";
import "./index.css";
import { CreateOrder, Header, Main } from "./components";
import { IOrder } from "./types";

function App() {
    const mock: IOrder[] = [{ status: "pending", id: "dsadsa1" }];

    return (
        <>
            <Header orders={mock} />
            <Main orders={mock} />
            <CreateOrder />
        </>
    );
}

export default App;
