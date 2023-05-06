import { IRequest } from "./IRequest";

export interface IPost {
    _id: string;
    text?: string;
    image?: string;
    video?: string;
    user: IRequest;
    likes: IRequest[];
}