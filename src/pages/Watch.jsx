import React, { useEffect } from 'react';
import { Grid } from "@material-ui/core";
import VideoWatch from "./../components/VideoWatch";
import { addView } from "./../api/index";
import { getVideo, getVideos } from "./../redux/actions/video";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import VideoDescription from "./../components/VideoDescription";
import VideoRecommend from "./../components/VideoRecommend";

const Watch = () => {
    const dispatch = useDispatch();
    const { videos, video: currentVideo } = useSelector(state => state.videos);
    const { id } = useParams();

    useEffect(() => addView(currentVideo?.video?._id));

    useEffect(() => {
        dispatch(getVideos(1));
        if (id)
            dispatch(getVideo(id));
    }, [id]);

    return (
        <>
            <Grid container spacing={3} className="mt-3">
                <Grid item xs={12} md={8}>
                    <VideoWatch currentVideo={currentVideo} />
                    <VideoDescription currentVideo={currentVideo} />
                </Grid>
                <Grid item xs={12} md={4}>
                    <h5 style={{ marginLeft: "-10px", marginTop: "-5px" }}>More videos</h5>
                    {videos?.map((v, i) => {
                        if (v?.video?._id !== currentVideo?.video?._id) return (
                            <span key={i}>
                                <VideoRecommend video={v?.video} channel={v?.creator} search={false} />
                            </span>
                        );
                    })}
                    {videos.length <= 1 && <p>No recommended videos found !<br />Refresh to fetch more videos !</p>}
                </Grid>
            </Grid>
        </>
    )
}

export default Watch;