import React, { createContext, useState } from "react";

// TODO: ADD TYPES
export const AppContext = createContext({});

export const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [createdOrder, setCreatedOrder] = useState<boolean>(false);

    return (
        <AppContext.Provider
            value={{
                createdOrder,
                setCreatedOrder,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};
