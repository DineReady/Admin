import React from "react";
import { IOrder } from "../../types";
import { options } from "../../lib/mocks";
import clsx from "clsx";

const Order = ({ status, id }: IOrder) => {
    return (
        <button className="min-h-30 min-w-96 max-h-30 max-w-96 bg-white flex flex-col p-5 rounded-xl items-start">
            <div className="text-2xl font-black">ID: {id}</div>
            <div className="text-2xl font-black">
                STATUS: {status.toUpperCase()}
            </div>
            <section className="w-full flex items-center justify-end pt-2 gap-x-2">
                {options.map((option) => (
                    <div
                        key={option.value}
                        className={`text-2xl font-black text-zinc-400 hover:${
                            option.color
                        } ${
                            status === option.value
                                ? "opacity-50 cursor-not-allowed"
                                : "cursor-pointer"
                        }`}
                    >
                        <button
                            className={clsx(
                                "",
                                status === option.value
                                    ? "opacity-50 cursor-not-allowed"
                                    : "cursor-pointer",
                            )}
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
