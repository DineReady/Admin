import React from "react";
import QRCode from "react-qr-code";

export default function QrCode({ orderId }: { orderId: string }) {
    return (
        <section className="flex flex-col absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-5 rounded-xl shadow-lg">
            <QRCode
                value={`http://localhost:3000/${orderId}`}
                className="w-full"
            />
            <p className="text-center text-white mt-4">
                Your order ID is: {orderId}
            </p>
        </section>
    );
}
