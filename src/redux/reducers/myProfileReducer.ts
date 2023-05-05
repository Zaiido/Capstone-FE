import { CLEAR_MY_PROFILE, GET_MY_PROFILE } from "../actions";

const initialState = {
    results: [],
};

const myProfileReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case GET_MY_PROFILE:
            return {
                ...state,
                results: action.payload,
            };
        case CLEAR_MY_PROFILE:
            return initialState;

        default:
            return state;
    }
};

export default myProfileReducer;