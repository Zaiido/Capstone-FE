import { CLEAR_FOLLOWERS, GET_FOLLOWERS } from "../actions";

const initialState = {
    results: [],
};

const followersReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case GET_FOLLOWERS:
            return {
                ...state,
                results: action.payload,
            };
        case CLEAR_FOLLOWERS:
            return initialState;

        default:
            return state;
    }
};

export default followersReducer;