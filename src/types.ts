export interface Card {
    id: number;
    title: string;
    date: number;
    content: string;
    key: string;
    isNew?: boolean;
}

interface CardPayload {
    id: number;
    date: number;
}

export interface CardPayloadMap {
    [key: string]: CardPayload;
}