export interface IHeader {
    orders: IOrder[];
}

export interface IOrder {
    status: "active" | "pending" | "complete" | "declined" | "taken";
    id: string
}

export interface IMain {
    orders: IOrder[];
}

export interface IActiveOrders {
    orders: IOrder[];
}
export interface IPendingOrders {
    orders: IOrder[];
}