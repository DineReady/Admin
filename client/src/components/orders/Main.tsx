import React, { useEffect, useState } from "react";
import { IMain, IOrder, OrderStatus } from "../../types";
import AllOrders from "./all_orders/AllOrders";

const Main = ({ orders }: IMain) => {
    const [active, setActive] = useState<IOrder[]>([]);
    const [pending, setPending] = useState<IOrder[]>([]);
    const [complete, setComplete] = useState<IOrder[]>([]);

    useEffect(() => {
        setActive(orders.filter((order) => order.status === "active"));
        setPending(orders.filter((order) => order.status === "pending"));
        setComplete(orders.filter((order) => order.status === "complete"));
    }, [orders]);

    return (
        <div className="h-full w-screen">
            <AllOrders orders={pending} status={OrderStatus.Complete} />
            <AllOrders orders={pending} status={OrderStatus.Pending} />
            <AllOrders orders={active} status={OrderStatus.Active} />
        </div>
    );
};

export default Main;
