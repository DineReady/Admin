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

const Order = ({ status, id }: IOrder): JSX.Element => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const onClose = (): void => setIsOpen(false);
    const onOpen = (): void => setIsOpen(true);
    const toast = useToast();

    // TODO: @Gniewkoss - Add options
    return (
        <>
            <button
                onClick={() => onOpen()}
                className="min-h-30 min-w-96 max-h-30 max-w-96 bg-white flex flex-col p-5 rounded-xl items-start"
            >
                <div className="text-2xl font-black">STATUS: {status.toUpperCase()}</div>
                <div className="text-sm font-black">ID: {id}</div>
                <section className="w-full flex items-center justify-end pt-2 gap-x-2">
                    {/* {options.map((option) => (
                    <Tooltip
                        hasArrow
                        label={option.value.toUpperCase()}
                        bg="gray.300"
                        color="black"
                        key={option.value}
                    >
                        <div
                            className={`text-2xl font-black text-zinc-400 hover:${option.color} ${
                                status === option.value ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                            }`}
                        >
                            <button
                                className={clsx(
                                    "",
                                    status === option.value
                                        ? "opacity-50 cursor-not-allowed"
                                        : "cursor-pointer",
                                )}
                                disabled={status === option.value}
                                onClick={() => {
                                    console.log(status, id);
                                }}
                            >
                                {option.icon}
                            </button>
                        </div>
                    </Tooltip>
                ))} */}
                </section>
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
        </>
    );
};

export default Order;
