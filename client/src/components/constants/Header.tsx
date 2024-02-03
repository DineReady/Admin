import React, { useEffect, useState } from "react";
import { IHeader } from "../../types";
import getCurrentTime from "../../lib/utils/timeUtils";
import axios from "axios";

const Header = ({ orders }: IHeader) => {
    const [currTime, setCurrTime] = useState("");
    const [msg, setMsg] = useState("");

    useEffect(() => {
        fetch("/api")
            .then((response) => response.json())
            .then((data) => {
                setMsg(data);
            });
        const interval = setInterval(() => {
            setCurrTime(getCurrentTime());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="h-20 px-10 py-5 flex justify-between items-center">
            <div className="text-2xl font-black">ORDERS: {orders}</div>
            <div className="text-2xl font-black">{currTime}</div>
            <p>{msg}</p>
        </div>
    );
};

export default Header;
