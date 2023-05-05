import { IRequest } from "../../interfaces/IRequest";
import { CLEAR_SENT_REQUESTS, GET_SENT_REQUESTS } from "../actions";

const initialState = {
    results: [] as IRequest[],
};

const sentRequestsReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case GET_SENT_REQUESTS:
            return {
                ...state,
                results: action.payload,
            };
        case CLEAR_SENT_REQUESTS:
            return initialState
        default:
            return state;
    }
};

export default sentRequestsReducer;