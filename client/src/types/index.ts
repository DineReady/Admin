import Login from '../lr/Login';

export { Login, };

export interface IHeader {
    orders: number | undefined;
}

export interface IOrder {
    status: OrderStatus;
    id: string;
    refresh: () => void;
}

export interface IMain {
    orders: IOrder[] | undefined;
}
export interface IAllOrders {
    orders: IOrder[];
    status: OrderStatus;
    refresh: () => void;
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

export interface OrderStatusUpdate {
    id: IOrder["id"];
    destination: OrderStatus;
}
