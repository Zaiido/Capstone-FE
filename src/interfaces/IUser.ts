export interface IUser {
    _id: string;
    username: string;
    email: string;
    password: string;
    bio?: string;
    avatar?: string;
    refreshToken: string;
    googleId: string;
    facebookId: string;
    receivedRequests: {
        pending: string[],
    },
    sendRequests: {
        pending: string[],
    },
    followers: string[],
    following: string[],
}