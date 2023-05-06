import { IRequest } from "./IRequest";

export interface IComment {
    _id: string,
    user: IRequest,
    comment: string,
    likes: IRequest[],
    post: string
}