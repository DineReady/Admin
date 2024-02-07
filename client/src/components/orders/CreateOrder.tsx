import { Plus } from "lucide-react";
import React from "react";
import QRCode from "react-qr-code";
import axios from "axios";

const CreateOrder = () => {
    // const ENDPOINT: string = "http://localhost:8080/orders/id";

    return (
        <button className="absolute h-20 w-20 rounded-full bg-yellow-200 flex items-center justify-center bottom-1 right-1">
            <Plus size={30} />
        </button>
    );
};

export default CreateOrder;
