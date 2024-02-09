import { Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import { useToast } from "@chakra-ui/react";
import "../../globals.css";
// import { createOrder } from "../../lib";
import axios, { AxiosResponse } from "axios";

const CreateOrder = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const toast = useToast(); // Declare toast here

    useEffect(() => {
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

    async function createOrder() {
        const ENDPOINT = "http://localhost:8080/orders/create";
        let orderId: string;

        try {
            setLoading(true);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const response: AxiosResponse<any, string> =
                await axios.get(ENDPOINT);
            orderId = response.data;

            toast({
                title: `Order created (${orderId})`,
                description: "Order created successfully",
                status: "success",
                duration: 2000,
                position: "bottom-right",
            });

            return orderId;
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
        <button
            className="create-order-btn"
            onClick={async () => {
                await createOrder();
            }}
        >
            <Plus size={30} />
        </button>
    );
};

export default CreateOrder;
