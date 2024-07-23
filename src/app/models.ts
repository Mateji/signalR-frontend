export interface Message {
    id: number;
    text: string;
    date: Date;
    sender: User;
}

export interface User {
    id: number;
    displayName: string;
}
