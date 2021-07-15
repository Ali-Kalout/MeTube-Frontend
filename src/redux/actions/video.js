import * as ActionTypes from "./../ActionTypes";
import * as api from "./../../api/index";

export const getSubscriptions = id => async (dispatch) => {
    try {
        const { data } = await api.getSubscriptions(id);

        dispatch({
            type: ActionTypes.GETSUBSCRIPTIONS,
            payload: data
        });
    } catch (error) {
        console.log(error);
    }
}

export const deleteVideo = id => async (dispatch) => {
    try {
        await api.deleteVideo(id);
    } catch (error) {
        console.log(error);
    }
}

export const getVideo = id => async (dispatch) => {
    try {
        const { data } = await api.getVideo(id);

        dispatch({
            type: ActionTypes.GETVIDEO,
            payload: data
        });
    } catch (error) {
        console.log(error);
    }
}

export const getVideos = p => async (dispatch) => {
    try {
        dispatch({ type: ActionTypes.STARTLOADING });
        const { data } = await api.getVideos(p);

        dispatch({
            type: ActionTypes.GETVIDEOS,
            payload: data
        });

        dispatch({ type: ActionTypes.ENDLOADING });
    } catch (error) {
        console.log(error);
    }
}

export const getVideoBySearch = (searchQuery) => async (dispatch) => {
    try {
        const { data } = await api.fetchVideoBySearch(searchQuery);

        dispatch({
            type: ActionTypes.GETBYSEARCH,
            payload: data
        });
    } catch (error) {
        console.log(error);
    }
}

export const likeVideo = id => async (dispatch) => {
    try {
        await api.likeVideo(id);
    } catch (error) {
        console.log(error);
    }
}

export const dislikeVideo = id => async (dispatch) => {
    try {
        await api.dislikeVideo(id);
    } catch (error) {
        console.log(error);
    }
}

export const uploadVideo = (video, history) => async (dispatch) => {
    try {
        history.push("/");
        const { data } = await api.uploadVideo(video);

        dispatch({
            type: ActionTypes.UPLOADVIDEO,
            payload: data
        });
    } catch (error) {
        console.log(error);
    }
}