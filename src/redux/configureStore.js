import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import { CHANNEL } from "./reducers/channel";
import { VIDEOS } from "./reducers/videos";

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            channel: CHANNEL, videos: VIDEOS
        }),
        applyMiddleware(thunk)
    );

    return store;
}