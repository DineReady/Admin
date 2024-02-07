export interface IHeader {
    orders: number;
}

export interface IOrder {
    status: OrderStatus;
    id: string;
}

export interface IMain {
    orders: IOrder[];
}
export interface IAllOrders {
    orders: IOrder[];
    status: OrderStatus;
}

export enum OrderStatus {
    Complete = "complete",
    Pending = "pending",
    Declined = "declined",
    Taken = "taken",
}

export enum OrderStatusHoverLabel {
    Pending = "Pending",
    Complete = "Complete",
    Declined = "Decline",
    Taken = "Taken",
}

export enum OrderStatusColor {
    Pending = "bg-orange-500",
    Complete = "bg-green-500",
    Declined = "bg-red-500",
    Taken = "bg-purple-500",
}
