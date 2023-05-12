import { IChat } from "../../interfaces/IChat";
import { CLEAR_ALL_CHATS, GET_ALL_CHATS } from "../actions";

const initialState = {
    results: [] as IChat[],
};

const allChatsReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case GET_ALL_CHATS:
            return {
                ...state,
                results: action.payload,
            };
        case CLEAR_ALL_CHATS:
            return initialState
        default:
            return state;
    }
};

export default allChatsReducer;