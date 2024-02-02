import React, { useEffect, useState } from "react";
import ActiveOrders from "./active/ActiveOrders";
import PendingOrders from "./pending/PendingOrders";
import { IMain, IOrder } from "../../types";

const Main = ({ orders }: IMain) => {
    const [active, setActive] = useState<IOrder[]>([]);
    const [pending, setPending] = useState<IOrder[]>([]);

    useEffect(() => {
        setActive(orders.filter((order) => order.status === "active"));
        setPending(orders.filter((order) => order.status === "pending"));
    }, [orders]);

    return (
        <div className="h-full w-screen">
            <ActiveOrders orders={active} />
            <PendingOrders orders={pending} />
        </div>
    );
};

export default Main;
