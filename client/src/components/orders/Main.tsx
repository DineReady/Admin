import React, { useEffect, useState } from "react";
import { IMain, IOrder, OrderStatus } from "../../types";
import AllOrders from "./all_orders/AllOrders";

const Main = ({ orders }: IMain) => {
    const [ordersByStatus, setOrdersByStatus] = useState<{
        [key in OrderStatus]: IOrder[];
    }>();

    useEffect(() => {
        const groupedOrders = orders.reduce(
            (acc, order) => {
                acc[order.status] = [...(acc[order.status] || []), order];
                return acc;
            },
            {} as { [key in OrderStatus]: IOrder[] },
        );

        setOrdersByStatus(groupedOrders);
    }, [orders]);

    return (
        <div className="h-full w-screen grid grid-cols-2">
            {ordersByStatus &&
                Object.entries(ordersByStatus).map(([status, orders]) => (
                    <AllOrders
                        key={status}
                        orders={orders}
                        status={status as OrderStatus}
                    />
                ))}
        </div>
    );
};

export default Main;
