import { useToast } from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { OrderStatusUpdate } from "../../types";
import Order from "./Order";

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
    refresh: () => void;
    loading: boolean;
}

export default function Main({ orders, refresh, loading }: IMain): JSX.Element {
    const [pendingOrders, setPendingOrders] = useState<IOrder[]>([]);
    const [completeOrders, setCompleteOrders] = useState<IOrder[]>([]);
    const [draggedItem, setDraggedItem] = useState<IOrder | null>(null);
    const [draggedFromList, setDraggedFromList] = useState<"pendingOrders" | "completeOrders" | null>(null);
    const POST_ORDER_STATE_UPDATE_ENDPOINT = "http://localhost:8080/orders/update-state";
    const toast = useToast();

    const updateOrderState = async (order: IOrder, destination: OrderStatus): Promise<void> => {
        try {
            await axios.post<OrderStatusUpdate>(POST_ORDER_STATE_UPDATE_ENDPOINT, {
                id: order.id,
                destination,
            });

            refresh();

            toast({
                title: "Order status updated",
                description: `Order status updated to ${destination}`,
                status: "success",
                duration: 2000,
                position: "bottom-right",
            });
        } catch (error: unknown) {
            console.error((error as Error).message);
            toast({
                title: "Error updating order status",
                description: "There was an error updating the order status",
                status: "error",
                duration: 2000,
                position: "bottom-right",
            });
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

        const newStatus: OrderStatus.Complete | OrderStatus.Pending =
            listIdentifier === "pendingOrders" ? OrderStatus.Pending : OrderStatus.Complete;

        try {
            await updateOrderState(draggedItem, newStatus);

            const sourceList: IOrder[] = draggedFromList === "pendingOrders" ? pendingOrders : completeOrders;
            const destinationList: IOrder[] =
                listIdentifier === "pendingOrders" ? pendingOrders : completeOrders;
            const itemIndex: number = sourceList.findIndex((item) => item.id === draggedItem.id);

            if (itemIndex !== -1) {
                const [removedItem] = sourceList.splice(itemIndex, 1);
                const updatedItem: {
                    status: OrderStatus.Complete | OrderStatus.Pending;
                    id: string;
                } = { ...removedItem, status: newStatus };
                const updatedDestinationList: IOrder[] = [...destinationList, updatedItem];

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
        <main className="flex justify-between items-start h-full w-screen">
            <section className="h-full px-10 py-5 min">
                <h1 className="text-2xl font-black pb-3">Pending</h1>
                <div
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, "pendingOrders")}
                    className="flex w-full items-center justify-start gap-2 flex-wrap overflow-x-auto min-w-32"
                >
                    {orders
                        ?.filter((order: IOrder): boolean => order.status === OrderStatus.Pending)
                        .map(
                            (order: IOrder): JSX.Element => (
                                <div
                                    key={order.id}
                                    className="relative flex"
                                    draggable
                                    onDragStart={() => handleDragStart(order, "pendingOrders")}
                                >
                                    <Order status={order.status} id={order.id} refresh={refresh} />
                                </div>
                            ),
                        )}
                </div>
            </section>

            <section className="h-full px-10 py-5">
                <h1 className="text-2xl font-black pb-3">Complete</h1>
                <div
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, "completeOrders")}
                    className="flex w-full items-center justify-start gap-2 flex-wrap overflow-x-auto min-w-32"
                >
                    {orders
                        ?.filter((order: IOrder): boolean => order.status === OrderStatus.Complete)
                        .map(
                            (order: IOrder): JSX.Element => (
                                <div
                                    key={order.id}
                                    className="relative flex"
                                    draggable
                                    onDragStart={() => handleDragStart(order, "completeOrders")}
                                >
                                    <Order status={order.status} id={order.id} refresh={refresh} />
                                </div>
                            ),
                        )}
                </div>
            </section>
        </main>
    );
}
