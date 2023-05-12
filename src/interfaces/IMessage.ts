import { IRequest } from "./IRequest";

export interface IMessage {
    manualId: string,
    sender: IRequest,
    text: string,
    image?: string,
    video?: string,
    createdAt: string
}