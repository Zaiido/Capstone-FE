import { IRequest } from "../../interfaces/IRequest";
import { CLEAR_RECEIVED_REQUESTS, GET_RECEIVED_REQUESTS } from "../actions";

const initialState = {
    results: [] as IRequest[],
};

const receivedRequestsReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case GET_RECEIVED_REQUESTS:
            return {
                ...state,
                results: action.payload,
            };
        case CLEAR_RECEIVED_REQUESTS:
            return initialState
        default:
            return state;
    }
};

export default receivedRequestsReducer;