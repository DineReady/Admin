import React, { useEffect, useState } from "react";
import { IHeader } from "../../types";
import { getCurrentTime } from "../../lib";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";

const Header = ({ orders }: IHeader) => {
    const [currTime, setCurrTime] = useState("");

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrTime(getCurrentTime());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="h-20 px-10 py-5 flex justify-between items-center">
            <div className="text-2xl font-black">ORDERS: {orders}</div>
            <div className="text-2xl font-black">{currTime}</div>
            <SignedOut>
                <SignInButton />
            </SignedOut>
            <SignedIn>
                <UserButton />
            </SignedIn>
        </div>
    );
};

export default Header;
