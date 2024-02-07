import { Plus } from "lucide-react";
import React from "react";
import QRCode from "react-qr-code";
import axios from "axios";
import "../../globals.css";

const CreateOrder = () => {
    const ENDPOINT = "http://localhost:8080/orders/id";

    const createOrder = async (): Promise<void> => {
        try {
            const response = await axios.get(ENDPOINT);
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <button onClick={createOrder} className="create-order-btn">
            <Plus size={30} />
        </button> 
    );
};

export default CreateOrder;
