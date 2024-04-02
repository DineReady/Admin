import React, { useContext, useEffect, useState } from "react";
import { CreateOrder, Header, Main } from "./components";
import { AppContext, AppContextProvider } from "./context";
import "./index.css";
import { IOrder } from "./types";

export default function App(): JSX.Element {
    const [orders, setOrders] = useState<IOrder[]>();
    const [loading, setLoading] = useState<boolean>(false);
    const { createdOrder, setCreatedOrder } = useContext(AppContext) as {
        createdOrder: boolean;
        setCreatedOrder: React.Dispatch<React.SetStateAction<boolean>>;
    };

    useEffect((): void => {
        (async (): Promise<void> => {
            try {
                setLoading(true);
                const response: Response = await fetch("http://localhost:8080/orders");
                const data: React.SetStateAction<IOrder[] | undefined> = await response.json();
                setOrders(data);
                setCreatedOrder(false);
            } catch (error: unknown) {
                console.error((error as Error).message);
            } finally {
                setLoading(false);
            }
        })();
    }, []);
    // }, [createdOrder, setCreatedOrder]);

    return (
        <AppContextProvider>
            <Header orders={orders?.length} />
            <Main orders={orders} />
            <CreateOrder />
        </AppContextProvider>
    );
}
