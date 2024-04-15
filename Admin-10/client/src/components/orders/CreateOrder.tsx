import { Plus } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import QRCode from "react-qr-code";
import { useToast } from "@chakra-ui/react";
import "../../globals.css";
import axios, { AxiosResponse } from "axios";
import clipboardCopy from "clipboard-copy";
import { AppContext } from "../../context";
import { CLIENT_DOMAIN } from "../../lib";

const CreateOrder = (): JSX.Element => {
    const [loading, setLoading] = useState<boolean>(false);
    const [orderId, setOrderId] = useState<string>("");
    const toast = useToast();
    const { createdOrder, setCreatedOrder } = useContext(AppContext) as {
        createdOrder: boolean;
        setCreatedOrder: React.Dispatch<React.SetStateAction<boolean>>;
    };

    useEffect((): void => {
        if (loading) {
            toast({
                title: "Creating order...",
                description: "Your kebab is being prepared",
                status: "loading",
                position: "bottom-right",
                duration: 2000,
            });
        }
    }, [loading]);

    async function createOrder(): Promise<void> {
        const ENDPOINT = "http://localhost:8080/orders/create";
        let orderId: { uniqueId: string } = { uniqueId: "" };

        try {
            setLoading(true);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const response: AxiosResponse<any, string> = await axios.get(ENDPOINT);
            orderId = response.data;

            toast({
                title: `Order created (${orderId.uniqueId.slice(0, 5) + "..." + orderId.uniqueId.slice(-5)})`,
                description: "Order created successfully",
                status: "success",
                duration: 2000,
                position: "bottom-right",
            });

            setCreatedOrder(true);
            setOrderId(orderId.uniqueId);
        } catch (error: unknown) {
            toast({
                title: `Error (${error})`,
                description: "There was an error creating the order",
                status: "error",
                duration: 2000,
                position: "bottom-right",
            });
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <button
                className="create-order-btn"
                onClick={async () => {
                    await createOrder();
                }}
            >
                <Plus size={30} />
            </button>
            {orderId && (
                <section className="flex flex-col fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-3 rounded-xl shadow-lg">
                    <QRCode value={`${CLIENT_DOMAIN}${orderId}`} className="w-full h-auto" />
                    <p className="text-center text-black mt-4 text-sm">
                        Your order ID is:{" "}
                        <button
                            onClick={() => {
                                clipboardCopy(orderId);
                                toast({
                                    title: "Copied to clipboard",
                                    description: "Order ID copied to clipboard",
                                    status: "success",
                                    duration: 1000,
                                    position: "bottom-right",
                                });
                            }}
                        >
                            <b>{orderId}</b>
                        </button>
                    </p>
                    <div className="flex items-center justify-between"></div>
                    <button
                        className="mt-5 px-2 py-1 bg-blue-400 rounded-lg text-white w-full text-lg font-semibold"
                        onClick={() => setOrderId("")}
                    >
                        Done
                    </button>
                </section>
            )}
        </>
    );
};

export default CreateOrder;
