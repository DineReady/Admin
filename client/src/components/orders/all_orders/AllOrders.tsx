/* eslint-disable indent */
import React, { useEffect, useState } from "react";
import { IAllOrders, IOrder, OrderStatusColor } from "../../../types";
import Order from "../Order";

const AllOrders = ({ orders, status, refresh }: IAllOrders): JSX.Element => {
    const [orderStatus, setOrderStatus] = useState<OrderStatusColor>();

    useEffect((): void => {
        switch (status) {
            case "pending":
                setOrderStatus(OrderStatusColor.Pending);
                break;
            case "complete":
                setOrderStatus(OrderStatusColor.Complete);
                break;
            default:
                setOrderStatus(OrderStatusColor.Pending);
                break;
        }
    }, [status]);

    return (
        <main className={`${orderStatus} h-full px-10 py-5`}>
            <header className="text-2xl font-black pb-3">{status.toUpperCase()}</header>
            <section className="flex w-full items-center justify-start gap-2 flex-wrap overflow-x-auto">
                {orders.map((order: IOrder) => (
                    <Order key={order.id} status={order.status} id={order.id} refresh={refresh} />
                ))}
            </section>
        </main>
    );
};

export default AllOrders;
