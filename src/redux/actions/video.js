import * as ActionTypes from "./../ActionTypes";
import * as api from "./../../api/index";

export const getVideos = p => async (dispatch) => {
    try {
        const { data } = await api.getVideos(p);

        dispatch({
            type: ActionTypes.GETVIDEOS,
            payload: data
        });
    } catch (error) {
        console.log(error);
    }
}

export const likeVideo = id => async (dispatch) => {
    try {
        const { data } = await api.likeVideo(id);

        dispatch({
            type: ActionTypes.LIKEVIDEO,
            payload: data
        });
    } catch (error) {
        console.log(error);
    }
}

export const dislikeVideo = id => async (dispatch) => {
    try {
        const { data } = await api.dislikeVideo(id);

        dispatch({
            type: ActionTypes.LIKEVIDEO,
            payload: data
        });
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