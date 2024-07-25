export interface Message {
    user: string;
    message: string;
    date: Date;
}

export interface User {
    id: number;
    displayName: string;
}
