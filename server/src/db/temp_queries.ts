// import { OrderStatus } from "../../types";

export const sql: string = `
    CREATE TABLE IF NOT EXISTS orders (
        id TEXT PRIMARY KEY,
        status TEXT CHECK (status IN (
            'complete',
            'pending',
            'declined',
            'taken'
        ))
    )
`;
