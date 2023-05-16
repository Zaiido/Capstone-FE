import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import localStorage from "redux-persist/es/storage";
import myProfileReducer from "../reducers/myProfileReducer";
import allProfilesReducer from "../reducers/allProfilesReducer";
import receivedRequestsReducer from "../reducers/receivedRequestsReducer";
import sentRequestsReducer from "../reducers/sentRequestsReducer";
import followingReducer from "../reducers/followingReducer";
import allPostsReducer from "../reducers/allPostsReducer";
import followersReducer from "../reducers/followersReducer";
import allChatsReducer from "../reducers/allChatsReducer";
import activeChatReducer from "../reducers/activeChatReducer";
import liveChatReducer from "../reducers/liveChatReducer";
import gardenReducer from "../reducers/gardenReducer";


const persistConfig = {
    storage: localStorage,
    key: "root"
}

const combinedReducer = combineReducers({
    myProfile: myProfileReducer,
    allProfiles: allProfilesReducer,
    receivedRequests: receivedRequestsReducer,
    sentRequests: sentRequestsReducer,
    following: followingReducer,
    allPosts: allPostsReducer,
    followers: followersReducer,
    allChats: allChatsReducer,
    activeChat: activeChatReducer,
    liveChat: liveChatReducer,
    garden: gardenReducer
})

const persistedReducer = persistReducer(persistConfig, combinedReducer)


const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({
            serializableCheck: false,
        });
    },
})

const persistedStore = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export { store, persistedStore }