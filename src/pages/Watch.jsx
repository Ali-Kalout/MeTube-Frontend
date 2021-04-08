import React, { useEffect, useState } from 'react';
import { Grid } from "@material-ui/core";
import VideoWatch from "./../components/VideoWatch";
import { addView } from "./../api/index";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import VideoDescription from "./../components/VideoDescription";
import axios from "axios";
import { url } from "./../api/index";

const Watch = ({ vid }) => {
    const videos = useSelector(state => state.videos);
    const location = useLocation();
    const [currentVideo, setCurrentVideo] = useState(
        videos.filter(v => v?.video?._id === location.pathname.substring(7) || v?.video?._id === vid?._id)[0]
    );

    // if not video get from server

    useEffect(() => {
        if (typeof (currentVideo) === "undefined") {
            axios.get(`${url}/search/watch/${location.pathname.substring(7)}`).then(({ data }) => setCurrentVideo(data));
        }
        addView(currentVideo?.video?._id);
    }, []);

    return (
        <>
            <Grid container spacing={3} className="mt-3">
                <Grid item xs={12} md={9}>
                    <VideoWatch currentVideo={currentVideo} />
                    <VideoDescription currentVideo={currentVideo} />
                    {/* comments here */}
                </Grid>
                <Grid item xs={12} md={3}>
                    shi
                </Grid>
            </Grid>
        </>
    )
}

export default Watch;