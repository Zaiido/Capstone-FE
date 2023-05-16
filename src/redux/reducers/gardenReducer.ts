import { CLEAR_GARDEN, GET_GARDEN } from "../actions";

const initialState = {
    results: [] as any[],
};

const gardenReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case GET_GARDEN:
            return {
                ...state,
                results: action.payload,
            };
        case CLEAR_GARDEN:
            return initialState
        default:
            return state;
    }
};

export default gardenReducer;