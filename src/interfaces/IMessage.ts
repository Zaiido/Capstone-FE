import { IRequest } from "./IRequest";

export interface IMessage {
    manualId: string,
    sender: IRequest,
    text: string,
    media?: string,
    createdAt: string
}