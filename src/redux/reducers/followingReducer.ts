import { CLEAR_FOLLOWING, GET_FOLLOWING } from "../actions";

const initialState = {
    results: [],
};

const followingReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case GET_FOLLOWING:
            return {
                ...state,
                results: action.payload,
            };
        case CLEAR_FOLLOWING:
            return initialState;

        default:
            return state;
    }
};

export default followingReducer;