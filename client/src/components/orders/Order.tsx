import React, { useState } from "react";
import { IOrder } from "../../types";
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

const Order = ({ status, id }: IOrder): JSX.Element => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const onClose = (): void => setIsOpen(false);
    const onOpen = (): void => setIsOpen(true);
    const toast = useToast();

    return (
        <div>
            <button
                onClick={() => onOpen()}
                className={clsx(
                    "min-h-30 min-w-96 max-h-30 max-w-96 flex flex-col p-5 rounded-xl items-start",
                    {
                        "bg-green-100": status === "complete",
                        "bg-yellow-100": status === "pending",
                        "bg-red-100": status === "declined",
                        "bg-blue-100": status === "taken",
                    },
                )}
            >
                <div className="text-2xl font-black">STATUS: {status.toUpperCase()}</div>
                <div className="text-sm font-black">ID: {id}</div>
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
                    </ModalBody>

                    <ModalFooter>
                        <button onClick={onClose}>Close</button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    );
};

export default Order;
