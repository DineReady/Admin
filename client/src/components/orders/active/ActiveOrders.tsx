/* eslint-disable indent */
import React from "react";
import { IActiveOrders } from "../../../types";

const ActiveOrders = ({ orders }: IActiveOrders) => {
    return (
        <div className="px-10 py-5 bg-green-200 text-2xl font-black">
            {orders.length > 0
                ? orders.map((order) => (
                      <div key={order.id}>{order.status}</div>
                  ))
                : "No active orders"}
        </div>
    );
};

export default ActiveOrders;
