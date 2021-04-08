import React, { useState, useEffect } from 'react';
import { Grid, Avatar, Typography } from "@material-ui/core";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { url } from "./../api/index";
import VideoView from "./../components/VideoView";
import millify from "millify";

const Channel = () => {
    const location = useLocation();
    const [channel, setChannel] = useState({});

    useEffect(() => axios.get(`${url}/search/channel/${location.pathname.substring(9)}`)
        .then(({ data }) => setChannel(data)), []
    );

    return (
        <div>
            <div className="channel-bg"></div>
            <Grid container spacing={3} className="channel-info">
                <Grid item xs={2}>
                    <Avatar style={{ height: "60px", width: "60px" }} className="ml-auto"
                        src={channel?.channel?.imageUrl} />
                </Grid>
                <Grid item xs={10}>
                    <h4>{channel?.channel?.name}</h4>
                    <Typography variant="body2" className="grey">
                        <b>{millify(0, { precision: 1 })} subscribers</b>
                    </Typography>
                </Grid>
            </Grid>
            <div className="mt-1">
                <Grid container>
                    {typeof (channel?.videos) === "undefined" || channel?.videos?.length === 0 ? (
                        <Typography className="mt-3" variant="h5">This channel has no videos yet !</Typography>
                    ) : (
                        channel?.videos?.map((v, i) => <VideoView video={v} channelView={true} key={i} />)
                    )}
                </Grid>
            </div>
        </div>
    );
}

export default Channel;