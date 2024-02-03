/* eslint-disable linebreak-style */
import { Check, ChefHat, Cookie, Trash2 } from "lucide-react";
import { IOrder, OrderStatus } from "../../types";
import React from "react";

export const options = [
    {
        value: OrderStatus.Declined,
        icon: (
            <Trash2
                size={25}
                className="hover:text-red-500 duration-300 transition ease-in-out"
            />
        ),
        color: "text-red-500",
    },
    {
        value: OrderStatus.Pending,
        icon: (
            <ChefHat
                size={25}
                className="hover:text-orange-500 duration-300 transition ease-in-out"
            />
        ),
        color: "text-orange-500",
    },
    {
        value: OrderStatus.Complete,
        icon: (
            <Check
                size={25}
                className="hover:text-green-500 duration-300 transition ease-in-out"
            />
        ),
        color: "text-green-500",
    },
    {
        value: OrderStatus.Taken,
        icon: (
            <Cookie
                size={25}
                className="hover:text-emerald-500 duration-300 transition ease-in-out"
            />
        ),
        color: "text-emerald-500",
    },
];

export const mock: IOrder[] = [
    { status: OrderStatus.Active, id: "1" },
    { status: OrderStatus.Active, id: "6" },
    { status: OrderStatus.Pending, id: "2" },
    { status: OrderStatus.Pending, id: "2" },
    { status: OrderStatus.Pending, id: "2" },
    { status: OrderStatus.Pending, id: "2" },
    { status: OrderStatus.Pending, id: "2" },
    { status: OrderStatus.Pending, id: "4" },
    { status: OrderStatus.Pending, id: "5" },
    { status: OrderStatus.Complete, id: "3" },
];
