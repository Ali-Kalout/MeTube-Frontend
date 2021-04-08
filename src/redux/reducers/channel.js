import * as ActionTypes from "../ActionTypes";

export const CHANNEL = (channel = {}, action) => {
    switch (action.type) {
        case ActionTypes.AUTH:
            localStorage.setItem("MYProfile", JSON.stringify(action.payload));
            window.location.reload();
            return action?.payload;

        case ActionTypes.LOGOUT:
            localStorage.removeItem("MYProfile");
            window.location.reload();
            return null;

        default:
            return channel;
    }
}