import { useToast } from "@chakra-ui/react";
import axios, { AxiosResponse } from "axios";

export default async function createOrder(): Promise<string | void> {
    const ENDPOINT = "http://localhost:8080/orders/id";
    const toast = useToast();
    let orderId: string;

    try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const response: AxiosResponse<any, string> = await axios.get(ENDPOINT);
        orderId = response.data;

        toast({
            title: `Order created (${orderId})`,
            description: "Order created successfully",
            status: "success",
            duration: 2000,
            position: "bottom-right",
        });

        return orderId;
    } catch (error) {
        toast({
            title: `Error (${error})`,
            description: "There was an error creating the order",
            status: "error",
            duration: 2000,
            position: "bottom-right",
        });
    }
}
