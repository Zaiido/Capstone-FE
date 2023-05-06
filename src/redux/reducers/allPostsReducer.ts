import { IPost } from "../../interfaces/IPost";
import { CLEAR_ALL_POSTS, GET_ALL_POSTS } from "../actions";

const initialState = {
    results: [] as IPost[],
};

const allPostsReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case GET_ALL_POSTS:
            return {
                ...state,
                results: action.payload,
            };
        case CLEAR_ALL_POSTS:
            return initialState
        default:
            return state;
    }
};

export default allPostsReducer;