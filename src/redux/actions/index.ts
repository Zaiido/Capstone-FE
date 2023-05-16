import { Dispatch } from "redux";



export const GET_MY_PROFILE = "GET_MY_PROFILE"
export const CLEAR_MY_PROFILE = "CLEAR_MY_PROFILE"
export const GET_ALL_PROFILES = "GET_ALL_PROFILES"
export const CLEAR_ALL_PROFILES = "CLEAR_ALL_PROFILES"
export const GET_RECEIVED_REQUESTS = "GET_RECEIVED_REQUESTS"
export const CLEAR_RECEIVED_REQUESTS = "CLEAR_RECEIVED_REQUESTS"
export const GET_SENT_REQUESTS = "GET_SENT_REQUESTS"
export const CLEAR_SENT_REQUESTS = "CLEAR_SENT_REQUESTS"
export const GET_FOLLOWING = "GET_FOLLOWING"
export const CLEAR_FOLLOWING = "CLEAR_FOLLOWING"
export const GET_ALL_POSTS = "GET_ALL_POSTS"
export const CLEAR_ALL_POSTS = "CLEAR_ALL_POSTS"
export const GET_FOLLOWERS = "GET_FOLLOWERS"
export const CLEAR_FOLLOWERS = "CLEAR_FOLLOWERS"
export const GET_ALL_CHATS = "GET_ALL_CHATS"
export const CLEAR_ALL_CHATS = "CLEAR_ALL_CHATS"
export const GET_ACTIVE_CHAT = "GET_ACTIVE_CHAT"
export const CLEAR_ACTIVE_CHAT = "CLEAR_ACTIVE_CHAT"
export const SET_LIVE_CHAT = "GET_LIVE_CHAT"
export const CLEAR_LIVE_CHAT = "CLEAR_LIVE_CHAT"
export const GET_GARDEN = "GET_GARDEN"
export const CLEAR_GARDEN = "CLEAR_GARDEN"



export const fetchMyProfileAction = (accessToken: string) => {
    return async (dispatch: Dispatch) => {
        try {
            let response = await fetch(
                `${process.env.REACT_APP_BE_URL}/users/me`,
                {
                    headers: {
                        "Authorization": `Bearer ${accessToken}`
                    }
                }
            );
            if (response.ok) {
                let myProfile = await response.json();
                dispatch({ type: GET_MY_PROFILE, payload: myProfile });
            } else {
                console.log("Error");
            }
        } catch (error) {
            console.log(error);

        };
    }
};


export const fetchAllProfilesAction = (accessToken: string) => {
    return async (dispatch: Dispatch) => {
        try {
            let response = await fetch(
                `${process.env.REACT_APP_BE_URL}/users`,
                {
                    headers: {
                        "Authorization": `Bearer ${accessToken}`
                    }
                }
            );
            if (response.ok) {
                let allProfiles = await response.json();
                dispatch({ type: GET_ALL_PROFILES, payload: allProfiles });
            } else {
                console.log("Error");
            }
        } catch (error) {
            console.log(error);

        };
    }
};


export const fetchReceivedRequestsAction = (userId: string, accessToken: string) => {
    return async (dispatch: Dispatch) => {
        try {
            let response = await fetch(
                `${process.env.REACT_APP_BE_URL}/users/${userId}/receivedRequests`,
                {
                    headers: {
                        "Authorization": `Bearer ${accessToken}`
                    }
                }
            );
            if (response.ok) {
                let allRequests = await response.json();
                dispatch({ type: GET_RECEIVED_REQUESTS, payload: allRequests });
            } else {
                console.log("Error");
            }
        } catch (error) {
            console.log(error);

        };
    }
};


export const fetchSentRequestsAction = (userId: string, accessToken: string) => {
    return async (dispatch: Dispatch) => {
        try {
            let response = await fetch(
                `${process.env.REACT_APP_BE_URL}/users/${userId}/sentRequests`,
                {
                    headers: {
                        "Authorization": `Bearer ${accessToken}`
                    }
                }
            );
            if (response.ok) {
                let allRequests = await response.json();
                dispatch({ type: GET_SENT_REQUESTS, payload: allRequests });
            } else {
                console.log("Error");
            }
        } catch (error) {
            console.log(error);

        };
    }
};


export const fetchFollowingAction = (userId: string, accessToken: string) => {
    return async (dispatch: Dispatch) => {
        try {
            let response = await fetch(
                `${process.env.REACT_APP_BE_URL}/users/${userId}/following`,
                {
                    headers: {
                        "Authorization": `Bearer ${accessToken}`
                    }
                }
            );
            if (response.ok) {
                let allFollowing = await response.json();
                dispatch({ type: GET_FOLLOWING, payload: allFollowing });
            } else {
                console.log("Error");
            }
        } catch (error) {
            console.log(error);

        };
    }
};


export const fetchAllPostsAction = (accessToken: string) => {
    return async (dispatch: Dispatch) => {
        try {
            let response = await fetch(
                `${process.env.REACT_APP_BE_URL}/posts`,
                {
                    headers: {
                        "Authorization": `Bearer ${accessToken}`
                    }
                }
            );
            if (response.ok) {
                let allPosts = await response.json();
                dispatch({ type: GET_ALL_POSTS, payload: allPosts });
            } else {
                console.log("Error");
            }
        } catch (error) {
            console.log(error);

        };
    }
};



export const fetchFollowersAction = (userId: string, accessToken: string) => {
    return async (dispatch: Dispatch) => {
        try {
            let response = await fetch(
                `${process.env.REACT_APP_BE_URL}/users/${userId}/followers`,
                {
                    headers: {
                        "Authorization": `Bearer ${accessToken}`
                    }
                }
            );
            if (response.ok) {
                let allFollowers = await response.json();
                dispatch({ type: GET_FOLLOWERS, payload: allFollowers });
            } else {
                console.log("Error");
            }
        } catch (error) {
            console.log(error);

        };
    }
};


export const fetchAllChatsAction = (userId: string, accessToken: string) => {
    return async (dispatch: Dispatch) => {
        try {
            let response = await fetch(
                `${process.env.REACT_APP_BE_URL}/chats/personalChats/${userId}`,
                {
                    headers: {
                        "Authorization": `Bearer ${accessToken}`
                    }
                }
            );
            if (response.ok) {
                let allChats = await response.json();
                dispatch({ type: GET_ALL_CHATS, payload: allChats });
            } else {
                console.log("Error");
            }
        } catch (error) {
            console.log(error);

        };
    }
};


export const fetchActiveChatAction = (chatId: string, accessToken: string) => {
    return async (dispatch: Dispatch) => {
        try {
            let response = await fetch(
                `${process.env.REACT_APP_BE_URL}/chats/${chatId}`,
                {
                    headers: {
                        "Authorization": `Bearer ${accessToken}`
                    }
                }
            );
            if (response.ok) {
                let activeChat = await response.json();
                dispatch({ type: GET_ACTIVE_CHAT, payload: activeChat });
            } else {
                console.log("Error");
            }
        } catch (error) {
            console.log(error);

        };
    }
};


export const fetchGarden = (userId: string, accessToken: string) => {
    return async (dispatch: Dispatch) => {
        try {
            let response = await fetch(
                `${process.env.REACT_APP_BE_URL}/garden/${userId}`,
                {
                    headers: {
                        "Authorization": `Bearer ${accessToken}`
                    }
                }
            );
            if (response.ok) {
                let garden = await response.json();
                dispatch({ type: GET_GARDEN, payload: garden });
            } else {
                console.log("Error");
            }
        } catch (error) {
            console.log(error);

        };
    }
};