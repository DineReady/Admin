import React from "react";
import "./index.css";
import { CreateOrder, Header, Main } from "./components";
import { mock } from "./lib/mocks";

export default function App(): JSX.Element {
    return (
        <>
            <Header orders={mock.length} />
            <Main orders={mock} />
            <CreateOrder />
        </>
    );
}
