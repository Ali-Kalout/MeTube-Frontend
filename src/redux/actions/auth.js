import * as ActionTypes from "./../ActionTypes";
import * as api from "./../../api/index";

export const auth = (userData, token, history) => async (dispatch) => {
    try {
        const { data } = await api.auth(userData);
        history.push("/");

        dispatch({
            type: ActionTypes.AUTH,
            payload: { profile: data, token }
        });
    } catch (error) {
        console.log(error);
    }
}

export const subscribe = id => async dispatch => {
    try {
        const { data } = await api.subscribe(id);

        console.log(data);
    } catch (error) {
        console.log(error);
    }
}