import React, { useEffect, useState } from "react";
import "./index.css";
import { CreateOrder, Header, Main } from "./components";
import { mock } from "./lib";
import { IOrder } from "./types";

export default function App(): JSX.Element {
    const [orders, setOrders] = useState<IOrder[]>();
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const response = await fetch("http://localhost:8080/orders");
                const data = await response.json();
                setOrders(data);
                console.log(data);
                setLoading(false);
            } catch (error: unknown) {
                console.error((error as Error).message);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    return (
        <>
            <Header orders={orders?.length || mock.length} />
            <Main orders={orders || mock} />
            <CreateOrder />
        </>
    );
}
