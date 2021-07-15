import React, { useState, useEffect } from 'react';
import { Grid, Avatar, Typography, Button } from "@material-ui/core";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { url } from "./../api/index";
import { subscribe } from "./../redux/actions/auth";
import VideoView from "./../components/VideoView";
import { useDispatch } from "react-redux";

const Channel = () => {
    const user = JSON.parse(localStorage.getItem("MYProfile"))?.profile;
    const location = useLocation();
    const [channel, setChannel] = useState({});
    const dispatch = useDispatch();
    const [isSub, setIsSub] = useState();
    const [subs, setSubs] = useState(0);

    useEffect(() => axios.get(`${url}/search/channel/${location.pathname.substring(9)}`)
        .then(({ data }) => setChannel(data)), []
    );

    useEffect(() => {
        setIsSub(channel?.channel?.subscribers.findIndex(id => id === user?._id) === -1 ? false : true);
        setSubs(channel?.channel?.subscribers?.length);
    }, [channel]);

    const sub = () => {
        if (isSub) setSubs(subs - 1);
        else setSubs(subs + 1);
        setIsSub(!isSub);
        dispatch(subscribe(channel?.channel?._id));
    }

    return (
        <div>
            <div className="channel-bg"></div>
            <Grid container spacing={3} className="channel-info">
                <Grid item xs={2} md={2}>
                    <Avatar style={{ height: "60px", width: "60px" }} className="ml-auto"
                        src={channel?.channel?.imageUrl} />
                </Grid>
                <Grid item xs={6} md={8}>
                    <h4>{channel?.channel?.name}</h4>
                    <Typography variant="body2" className="grey">
                        <b>{subs} subscribers</b>
                    </Typography>
                </Grid>
                {(user && channel?.channel?.googleId !== user?.googleId) && (
                    <Grid item xs={4} md={2}>
                        {!isSub ?
                            <Button color="primary" onClick={sub} className="mt-2" variant="contained">SUBSCRIBE</Button>
                            :
                            <Button color="inherit" onClick={sub} className="mt-2" variant="outlined">UNSUBSCRIBE</Button>
                        }
                    </Grid>
                )}
            </Grid>
            <div className="mt-1">
                <Grid container justify="center">
                    {typeof (channel?.videos) === "undefined" || channel?.videos?.length === 0 ? (
                        <Typography className="mt-3" variant="h5">This channel has no videos yet !</Typography>
                    ) : (
                        channel?.videos?.map((v, i) => <VideoView
                            owner={user?._id === channel?.channel?._id ? true : false}
                            video={v}
                            channelView={true}
                            key={i}
                        />)
                    )}
                </Grid>
            </div>
        </div>
    );
}

export default Channel;