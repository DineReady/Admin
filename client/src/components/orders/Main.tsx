import React, { useEffect, useState } from "react";
import { IMain, IOrder, OrderStatus } from "../../types";
import AllOrders from "./all_orders/AllOrders";
import { DndContext } from "@dnd-kit/core";

const Main = ({ orders }: IMain): JSX.Element => {
    const [ordersByStatus, setOrdersByStatus] = useState<{
        [key in OrderStatus]: IOrder[];
    }>();

    useEffect(() => {
        const groupedOrders = orders?.reduce(
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
                Object.entries(ordersByStatus).map(
                    ([status, orders]): JSX.Element => (
                        <DndContext key={status}>
                            <AllOrders orders={orders} status={status as OrderStatus} />
                        </DndContext>
                    ),
                )}
        </div>
    );
};

export default Main;
