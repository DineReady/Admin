/* eslint-disable indent */
/* eslint-disable quotes */
import React, { useEffect, useState } from "react";
import { IAllOrders, IOrder, OrderStatusColor } from "../../../types";
import Order from "../Order";

const AllOrders = ({ orders, status }: IAllOrders): JSX.Element => {
    const [orderStatus, setOrderStatus] = useState<OrderStatusColor>();

    useEffect(() => {
        switch (status) {
            case "active":
                setOrderStatus(OrderStatusColor.Active);
                break;
            case "pending":
                setOrderStatus(OrderStatusColor.Pending);
                break;
            case "complete":
                setOrderStatus(OrderStatusColor.Complete);
                break;
            default:
                setOrderStatus(OrderStatusColor.Active);
                break;
        }
    }, [status]);

    return (
        <main className={`${orderStatus} px-10 py-5`}>
            <header className="text-2xl font-black pb-3">
                {status.toUpperCase()}
            </header>
            <section className="flex w-full items-center justify-start gap-2 flex-wrap overflow-x-auto">
                {orders.map((order: IOrder) => (
                    <Order key={order.id} status={order.status} id={order.id} />
                ))}
            </section>
        </main>
    );
};

export default AllOrders;
