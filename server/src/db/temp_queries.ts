import { OrderStatus } from "../../types";

export const sql: string = `
    CREATE TABLE IF NOT EXISTS orders (
        id INTEGER PRIMARY KEY,
        status TEXT CHECK (status IN (
            '${OrderStatus.Complete}',
            '${OrderStatus.Pending}',
            '${OrderStatus.Active}',
            '${OrderStatus.Declined}',
            '${OrderStatus.Taken}'
        ))
    )
`;
