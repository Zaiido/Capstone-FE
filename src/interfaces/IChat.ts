import { IRequest } from "./IRequest";

export interface IChat {
    _id: string,
    name?: string,
    members: IRequest[],
    messages: string[]
}