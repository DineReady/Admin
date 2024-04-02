import React, { useEffect, useState } from "react";
import { IMain, IOrder, OrderStatus } from "../../types";
import AllOrders from "./all_orders/AllOrders";
import App from "../../App";
import { ClerkProvider } from "@clerk/clerk-react";

const Main = ({ orders }: IMain): JSX.Element => {
    const [ordersByStatus, setOrdersByStatus] = useState<{
        [key in OrderStatus]: IOrder[];
    }>();

    useEffect(() => {
        const fetchData = async () => {
            const groupedOrders = orders?.reduce(
                (acc, order) => {
                    acc[order.status] = [...(acc[order.status] || []), order];
                    return acc;
                },
                {} as { [key in OrderStatus]: IOrder[] },
            );

            setOrdersByStatus(groupedOrders);
        };

        fetchData();
    }, [orders]);

    const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

    if (!PUBLISHABLE_KEY) {
        throw new Error("Missing Publishable Key");
    }

    return (
        <React.StrictMode>
            <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
                <App />
            </ClerkProvider>
            <div className="h-full w-screen grid grid-cols-2">
                {ordersByStatus &&
                    Object.entries(ordersByStatus).map(
                        ([status, orders]): JSX.Element => (
                            <AllOrders key={status} orders={orders} status={status as OrderStatus} />
                        ),
                    )}
            </div>
        </React.StrictMode>
    );
};

export default Main;
