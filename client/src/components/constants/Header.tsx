import React, { useEffect, useState } from "react";
import { IHeader } from "../../types";
import { getCurrentTime } from "../../lib";

const Header = ({ orders }: IHeader): JSX.Element => {
    const [currTime, setCurrTime] = useState<string>("");

    useEffect((): (() => void) => {
        const interval = setInterval(() => {
            setCurrTime(getCurrentTime());
        }, 1000);

        return (): void => clearInterval(interval);
    }, []);

    return (
        <div className="h-20 px-10 py-5 flex justify-between items-center">
            <div className="text-2xl font-black">ORDERS: {orders}</div>
            <div className="text-2xl font-black">{currTime}</div>
        </div>
    );
};

export default Header;
