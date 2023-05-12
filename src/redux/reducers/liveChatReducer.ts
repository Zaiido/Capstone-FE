import { IMessage } from "../../interfaces/IMessage";
import { CLEAR_LIVE_CHAT, SET_LIVE_CHAT } from "../actions";

const initialState = {
    results: [] as IMessage[],
};

const liveChatReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case SET_LIVE_CHAT:
            return {
                ...state,
                results: action.payload,
            };
        case CLEAR_LIVE_CHAT:
            return initialState
        default:
            return state;
    }
};

export default liveChatReducer;