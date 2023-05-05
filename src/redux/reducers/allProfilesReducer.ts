import { IUser } from "../../interfaces/IUser";
import { CLEAR_ALL_PROFILES, GET_ALL_PROFILES } from "../actions";

const initialState = {
    results: [] as IUser[],
};

const allProfilesReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case GET_ALL_PROFILES:
            return {
                ...state,
                results: action.payload,
            };
        case CLEAR_ALL_PROFILES:
            return initialState
        default:
            return state;
    }
};

export default allProfilesReducer;