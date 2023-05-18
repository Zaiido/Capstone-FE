import { CLEAR_STORES, GET_STORES } from "../actions";

const initialState = {
    results: [],
};

const storesReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case GET_STORES:
            return {
                ...state,
                results: action.payload,
            };
        case CLEAR_STORES:
            return initialState
        default:
            return state;
    }
};

export default storesReducer;