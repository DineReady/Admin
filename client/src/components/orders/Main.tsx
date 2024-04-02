import React, { useState } from "react";
import axios from "axios";
import { OrderStatusUpdate } from "../../types";

enum OrderStatus {
    Complete = "complete",
    Pending = "pending",
    Declined = "declined",
    Taken = "taken",
}
interface IOrder {
    status: OrderStatus;
    id: string;
}

interface IMain {
    orders: IOrder[] | undefined;
}

export default function Main({ orders }: IMain): JSX.Element {
    const [pendingOrders, setPendingOrders] = useState<IOrder[]>([]);
    const [completeOrders, setCompleteOrders] = useState<IOrder[]>([]);
    const [draggedItem, setDraggedItem] = useState<IOrder | null>(null);
    const [draggedFromList, setDraggedFromList] = useState<"pendingOrders" | "completeOrders" | null>(null);
    const POST_ORDER_STATE_UPDATE_ENDPOINT = "http://localhost:8080/orders/update-state";

    const updateOrderState = async (order: IOrder, destination: OrderStatus): Promise<void> => {
        try {
            await axios.post<OrderStatusUpdate>(POST_ORDER_STATE_UPDATE_ENDPOINT, {
                id: order.id,
                destination,
            });
        } catch (error: unknown) {
            console.error((error as Error).message);
        }
    };

    const handleDragStart = (item: IOrder, listIdentifier: "pendingOrders" | "completeOrders"): void => {
        setDraggedItem(item);
        setDraggedFromList(listIdentifier);
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>): void => {
        e.preventDefault();
    };

    const handleDrop = async (
        e: React.DragEvent<HTMLDivElement>,
        listIdentifier: "pendingOrders" | "completeOrders",
    ): Promise<void> => {
        e.preventDefault();
        if (!draggedItem || draggedFromList === listIdentifier) return;

        const newStatus = listIdentifier === "pendingOrders" ? OrderStatus.Pending : OrderStatus.Complete;

        try {
            await updateOrderState(draggedItem, newStatus);

            const sourceList: IOrder[] = draggedFromList === "pendingOrders" ? pendingOrders : completeOrders;
            const destinationList: IOrder[] =
                listIdentifier === "pendingOrders" ? pendingOrders : completeOrders;
            const itemIndex: number = sourceList.findIndex((item) => item.id === draggedItem.id);

            if (itemIndex !== -1) {
                const [removedItem] = sourceList.splice(itemIndex, 1);
                const updatedItem = { ...removedItem, status: newStatus };
                const updatedDestinationList = [...destinationList, updatedItem];

                if (draggedFromList === "pendingOrders") {
                    setPendingOrders([...sourceList]);
                    setCompleteOrders(updatedDestinationList);
                } else {
                    setCompleteOrders([...sourceList]);
                    setPendingOrders(updatedDestinationList);
                }
            }
        } catch (error) {
            console.error("Failed to update order status", error);
        }

        setDraggedItem(null);
        setDraggedFromList(null);
    };

    return (
        <main className="flex flex-col items-center space-y-4 min-h-screen">
            <h1 className="mt-4 text-xl font-bold">Pending</h1>
            <div onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, "pendingOrders")}>
                {orders
                    ?.filter((order) => order.status === OrderStatus.Pending)
                    .map((order) => (
                        <div
                            key={order.id}
                            className="relative flex space-x-3 p-2 border rounded bg-gray-100"
                            draggable
                            onDragStart={() => handleDragStart(order, "pendingOrders")}
                        >
                            <p>{order.id}</p>
                        </div>
                    ))}
            </div>

            <h1 className="mt-4 text-xl font-bold">Complete</h1>
            <div onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, "completeOrders")}>
                {orders
                    ?.filter((order) => order.status === OrderStatus.Complete)
                    .map((order) => (
                        <div
                            key={order.id}
                            className="relative flex space-x-3 p-2 border rounded bg-gray-100"
                            draggable
                            onDragStart={() => handleDragStart(order, "completeOrders")}
                        >
                            <p>{order.id}</p>
                        </div>
                    ))}
            </div>
        </main>
    );
}
