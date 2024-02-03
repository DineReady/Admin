import React from "react";
import { IHeader } from "../../types";

const Header = ({ orders }: IHeader) => {
    return (
        <div className="h-20 px-10 py-5">
            <div className="text-2xl font-black">ORDERS: {orders}</div>
        </div>
    );
};

export default Header;
