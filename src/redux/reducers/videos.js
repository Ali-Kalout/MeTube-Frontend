import * as ActionTypes from "./../ActionTypes";

export const VIDEOS = (videos = [], action) => {
    switch (action.type) {
        case ActionTypes.GETVIDEOS:
            return action.payload;
            
        case ActionTypes.GETBYSEARCH:
            return action.payload;

        case ActionTypes.LIKEVIDEO:
        case ActionTypes.DISLIKEVIDEO:
            return videos.map(v => v.video._id === action.payload.video._id ? action.payload : v);

        default:
            return [];
    }
}