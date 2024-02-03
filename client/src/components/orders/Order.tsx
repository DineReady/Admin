import React from "react";
import { IOrder } from "../../types";
import { options } from "../../lib/mocks";

const Order = ({ status, id }: IOrder) => {
    return (
        <button className="h-30 w-96 bg-white flex flex-col p-5 rounded-xl items-start">
            <div className="text-2xl font-black">ID: {id}</div>
            <div className="text-2xl font-black">STATUS: {status}</div>
            <section className="w-full flex items-center justify-end pt-2 gap-x-2">
                {options.map((option) => (
                    <div
                        key={option.value}
                        className={`text-2xl font-black text-zinc-400 hover:${
                            option.color
                        } cursor-pointer ${
                            status === option.value
                                ? "opacity-50 cursor-not-allowed"
                                : ""
                        }`}
                    >
                        <button
                            disabled={status === option.value}
                            onClick={() => {
                                console.log(status, id);
                            }}
                        >
                            {option.icon}
                        </button>
                    </div>
                ))}
            </section>
        </button>
    );
};

export default Order;
