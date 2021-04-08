import React from 'react';
import { Typography, Grid } from "@material-ui/core";
import moment from "moment";
import VideoInfo from "./VideoInfo";

const VideoWatch = ({ currentVideo }) => {
    return (
        <div>
            <video src={currentVideo?.video?.selectedFile} controls width="100%" style={{ maxHeight: "500px", backgroundColor: "black" }} />
            {currentVideo?.video?.tags?.map((t, i) => (
                <small style={{ fontSize: "14px" }} key={i} className="blue pointer">{`#${t} `}</small>
            ))}
            <Typography variant="h6">{currentVideo?.video?.title}</Typography>
            <Grid container className="mt-2">
                <Grid item xs={5}>
                    <Typography variant="body2" className="grey">
                        {currentVideo?.video?.views?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} views -&nbsp;
                        {moment(currentVideo?.video?.createdAt).format('D MMM YYYY')}
                    </Typography>
                </Grid>
                <Grid item xs={7} style={{ marginTop: "-9px", textAlign: "right" }}>
                    <VideoInfo currentVideo={currentVideo} />
                </Grid>
            </Grid>
            <hr style={{ marginTop: "-8px" }} />
        </div>
    );
}

export default VideoWatch;