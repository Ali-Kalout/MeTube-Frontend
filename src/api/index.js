import axios from "axios";

export const url = 'http://localhost:5000';

const API = axios.create({ baseURL: url });

API.interceptors.request.use(req => {
    if (localStorage.getItem("MYProfile")) {
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem("MYProfile")).token}`;
    }

    return req;
});

// channel

export const auth = profile => API.post("/channel", profile);
export const subscribe = id => API.post(`/channel/subscribe/${id}`);

// video

export const getSubscriptions = id => API.get(`channel/${id}`);
export const deleteVideo = id => API.delete(`/video/${id}`);
export const getVideo = id => API.get(`/video/${id}`);
export const uploadVideo = vid => API.post("/video", vid);
export const getVideos = p => API.get(`/video?page=${p}`);
export const fetchVideoBySearch = searchQuery => API.get(`/video/search/${searchQuery}`);
export const addView = id => API.post(`/video/${id}`);
export const likeVideo = id => API.post(`/video/${id}/like`);
export const dislikeVideo = id => API.post(`/video/${id}/dislike`);