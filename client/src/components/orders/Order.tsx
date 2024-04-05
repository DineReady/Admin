import React, { useState } from "react";
import { IOrder, OrderStatus } from "../../types";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useToast,
} from "@chakra-ui/react";
import QRCode from "react-qr-code";
import clipboardCopy from "clipboard-copy";
import { CLIENT_DOMAIN } from "../../lib";
import clsx from "clsx";
import { Trash2 } from "lucide-react";
import axios from "axios";

const Order = ({ status, id, refresh }: IOrder): JSX.Element => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isOpenAreYouSure, setIsOpenAreYouSure] = useState<boolean>(false);
    const onClose = (): void => setIsOpen(false);
    const onOpen = (): void => setIsOpen(true);
    const onCloseAreYouSure = (): void => setIsOpenAreYouSure(false);
    const onOpenAreYouSure = (): void => setIsOpenAreYouSure(true);
    const toast = useToast();

    async function deleteOrder(): Promise<void> {
        const host = `http://localhost:8080/orders/delete/${id}`;

        try {
            await axios.delete(host);

            refresh();

            toast({
                title: "Order deleted",
                description: `Order with ID: ${id} has been deleted`,
                status: "success",
                duration: 1000,
                position: "bottom-right",
            });
        } catch (error) {
            toast({
                title: "Error deleting order",
                description: `An error occurred while deleting order with ID: ${id}`,
                status: "error",
                duration: 1000,
                position: "bottom-right",
            });
        }
    }

    async function updateStatus(status: string): Promise<void> {
        const host = "http://localhost:8080/orders/update-state";

        try {
            await axios.post(host, {
                id,
                destination: status,
            });

            refresh();

            toast({
                title: "Order status updated",
                description: `Order status updated to ${status}`,
                status: "success",
                duration: 1000,
                position: "bottom-right",
            });
        } catch (error) {
            toast({
                title: "Error updating order status",
                description: "An error occurred while updating the order status",
                status: "error",
                duration: 1000,
                position: "bottom-right",
            });
        }
    }

    return (
        <div>
            <button
                onClick={() => onOpen()}
                className={clsx(
                    "min-h-30 min-w-96 max-h-30 max-w-96 flex p-5 rounded-xl items-start justify-between",
                    {
                        "bg-green-100": status === OrderStatus.Complete,
                        "bg-yellow-100": status === OrderStatus.Pending,
                        "bg-red-100": status === OrderStatus.Declined,
                        "bg-blue-100": status === OrderStatus.Taken,
                    },
                )}
            >
                <div className="flex flex-col items-start justify-between w-full">
                    <div className="text-2xl font-black">STATUS: {status.toUpperCase()}</div>
                    <div className="text-sm font-black">ID: {id}</div>
                </div>
            </button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>ORDER</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <QRCode value={`${CLIENT_DOMAIN}${id}`} className="w-full h-auto" />
                        <button
                            onClick={() => {
                                clipboardCopy(id);
                                toast({
                                    title: "Copied to clipboard",
                                    description: "Order ID copied to clipboard",
                                    status: "success",
                                    duration: 1000,
                                    position: "bottom-right",
                                });
                            }}
                            className="text-left text-black mt-4"
                        >
                            ID: <b>{id}</b>
                        </button>
                        <p>
                            STATUS: <b>{status.toUpperCase()}</b>
                        </p>
                        <button
                            onClick={() => {
                                onOpenAreYouSure();
                            }}
                            className="hover:text-red-500 bg-red-200 px-2 rounded-lg mt-2 text-nowrap flex items-center justify-start text-center"
                        >
                            Delete <Trash2 size={15} />
                        </button>
                        <button
                            className={clsx(
                                "text-white px-2 rounded-lg mt-2 text-nowrap flex items-center justify-start text-center",
                                {
                                    "bg-green-500": status === OrderStatus.Pending,
                                    "bg-yellow-500": status === OrderStatus.Complete,
                                },
                            )}
                            onClick={() => {
                                if (status === "pending") {
                                    updateStatus("complete");
                                } else {
                                    updateStatus("pending");
                                }
                            }}
                        >
                            Update Status
                        </button>
                    </ModalBody>

                    <ModalFooter>
                        <button onClick={onClose}>Close</button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            <Modal isOpen={isOpenAreYouSure} onClose={onCloseAreYouSure}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>ORDER</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <p>Are you sure you want to delete this order?</p>
                        <button onClick={deleteOrder} className="text-red-500 mt-4 pb-2">
                            Yes, delete order
                        </button>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </div>
    );
};

export default Order;
