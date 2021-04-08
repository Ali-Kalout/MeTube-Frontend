import axios from "axios";

export const url = 'http://localhost:5000';

const API = axios.create({ baseURL: url });

API.interceptors.request.use(req => {
    if (localStorage.getItem("MYProfile")) {
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem("MYProfile")).token}`;
    }

    return req;
});

// authorization

export const auth = profile => API.post("/signin", profile);

// video

export const uploadVideo = vid => API.post("/video", vid);
export const getVideos = () => API.get("/video");
export const addView = id => API.post(`/video/${id}`);
export const likeVideo = id => API.post(`/video/${id}/like`);
export const dislikeVideo = id => API.post(`/video/${id}/dislike`);