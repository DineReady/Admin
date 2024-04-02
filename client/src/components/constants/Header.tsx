import React, { useEffect, useState } from "react";
import { IHeader } from "../../types";
import { getCurrentTime } from "../../lib";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";

const Header = ({ orders }: IHeader): JSX.Element => {
    const [currTime, setCurrTime] = useState<string>("");

    useEffect((): (() => void) => {
        const interval = setInterval(() => {
            setCurrTime(getCurrentTime());
        }, 1000);

        return (): void => clearInterval(interval);
    }, []);
    const { login, register } = useKindeAuth();
    return (
        <div className="h-20 px-10 py-5 flex justify-between items-center">
            <div className="text-2xl font-black">ORDERS: {orders}</div>
            <div className="text-2xl font-black">{currTime}</div>
            <button onClick={() => register()} type="button">
                Register
            </button>
            <button onClick={() => login()} type="button">
                Log In
            </button>
        </div>
    );
};

export default Header;
