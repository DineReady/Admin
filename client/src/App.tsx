import React from "react";
import "./index.css";
import { CreateOrder, Header, Main } from "./components";
import { IOrder, OrderStatus } from "./types";

export default function App(): JSX.Element {
    const mock: IOrder[] = [
        { status: OrderStatus.Active, id: "1" },
        { status: OrderStatus.Pending, id: "2" },
        { status: OrderStatus.Complete, id: "3" },
    ];

    return (
        <>
            <Header orders={mock.length} />
            <Main orders={mock} />
            <CreateOrder />
        </>
    );
}
