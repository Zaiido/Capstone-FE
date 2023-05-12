import { IChat } from "../../interfaces/IChat";
import { CLEAR_ACTIVE_CHAT, GET_ACTIVE_CHAT } from "../actions";

const initialState = {
    results: [] as IChat[],
};

const activeChatReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case GET_ACTIVE_CHAT:
            return {
                ...state,
                results: action.payload,
            };
        case CLEAR_ACTIVE_CHAT:
            return initialState
        default:
            return state;
    }
};

export default activeChatReducer;