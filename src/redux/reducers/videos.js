import * as ActionTypes from "./../ActionTypes";

export const VIDEOS = (state = {
    isLoading: true,
    videos: [],
    currentPage: Number,
    numberOfPages: Number
}, action) => {
    switch (action.type) {
        case ActionTypes.GETVIDEOS:
            return {
                ...state,
                videos: action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages
            };

        case ActionTypes.GETBYSEARCH:
            return { ...state, videos: action.payload };

        case ActionTypes.GETVIDEO:
            return { ...state, video: action.payload };

        case ActionTypes.STARTLOADING:
            return { ...state, isLoading: true };

        case ActionTypes.ENDLOADING:
            return { ...state, isLoading: false };

        default:
            return state;
    }
}