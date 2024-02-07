import { Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import { useToast } from "@chakra-ui/react";
import "../../globals.css";
import { createOrder } from "../../lib";

const CreateOrder = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const toast = useToast();

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
    }, [loading as true]);

    return (
        <button
            // TODO: fix the err: Invalid hook call. Hooks can only be called inside of the body of a function component.
            className="create-order-btn"
            onClick={() => {
                setLoading(true);
                createOrder().then(() => setLoading(false));
            }}
        >
            <Plus size={30} />
        </button>
    );
};

export default CreateOrder;
