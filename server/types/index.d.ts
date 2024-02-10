export enum OrderStatus {
    Complete = "complete",
    Pending = "pending",
    Declined = "declined",
    Taken = "taken",
}

export interface Order {
    id: string;
    status: OrderStatus;
    created_at: string;
    updated_at: string;
}
