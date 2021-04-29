import React, { useEffect, useState } from 'react';
import { Grid } from "@material-ui/core";
import VideoWatch from "./../components/VideoWatch";
import { addView } from "./../api/index";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import VideoDescription from "./../components/VideoDescription";
import VideoRecommend from "./../components/VideoRecommend";
import axios from "axios";
import { url } from "./../api/index";

const Watch = ({ vid }) => {
    const videos = useSelector(state => state.videos);
    const location = useLocation();
    const [channel, setChannel] = useState([]);
    const [currentVideo, setCurrentVideo] = useState(
        videos.filter(v => v?.video?._id === location.pathname.substring(7) || v?.video?._id === vid?._id)[0]
    );

    // if not video get from server

    useEffect(() => {
        if (typeof (currentVideo) === "undefined") axios.get(`${url}/search/watch/${location.pathname.substring(7)}`)
            .then(({ data }) => setCurrentVideo(data));
        axios.get(`${url}/search/channel/${currentVideo?.creator?._id}`).then(({ data }) => setChannel(data));
        addView(currentVideo?.video?._id);
    }, []);

    return (
        <>
            <Grid container spacing={3} className="mt-3">
                <Grid item xs={12} md={8}>
                    <VideoWatch currentVideo={currentVideo} />
                    <VideoDescription currentVideo={currentVideo} />
                    {/* comments here */}
                </Grid>
                <Grid item xs={12} md={4}>
                    {channel?.videos?.length !== 1 ?
                        <>
                            <h5 style={{ marginLeft: "-10px" }}>More videos by {channel?.channel?.name}</h5>
                            {channel?.videos?.map((v, i) => {
                                if (v?._id !== currentVideo?.video?._id) return (
                                    <span key={i}>
                                        <VideoRecommend video={v} channel={channel?.channel} search={false} />
                                    </span>
                                );
                            })}
                        </> :
                        <>
                            <h5 style={{ marginLeft: "-10px" }}>Recommended videos</h5>
                            {videos?.map((v, i) => {
                                if (v?.video?._id !== currentVideo?.video?._id) return (
                                    <span key={i}>
                                        <VideoRecommend video={v?.video} channel={v?.creator} search={false} />
                                    </span>
                                );
                            })}
                        </>
                    }
                </Grid>
            </Grid>
        </>
    )
}

export default Watch;