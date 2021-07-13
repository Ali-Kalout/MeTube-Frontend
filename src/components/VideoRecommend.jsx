import React from 'react';
import { Grid, Typography } from "@material-ui/core";
import millify from "millify";
import moment from "moment";
import { Link, useHistory } from "react-router-dom";

const VideoRecommend = ({ video, channel, search }) => {
    const history = useHistory();

    const chooseVid = () => {
        history.push(`/watch/${video?._id}`);
        window.location.reload();
    }

    return (
        <Grid container spacing={2} className="mb-2 mt-1">
            <Grid xs={5}>
                <img alt="" src={video?.thumbnail} className="pointer" onClick={chooseVid} width={!search && "168"}
                    height={!search && "100"} />
            </Grid>
            <Grid item xs={7}>
                <Typography style={{ marginTop: "-10px" }} onClick={chooseVid} className="mb-1 pointer" variant="subtitle1">
                    {video?.title?.substring(0, 28)}{video?.title?.length > 28 && " ..."}
                </Typography>
                <Typography variant="subtitle2" className="grey" component={Link} to={`/channel/${channel?._id}`}>
                    {channel?.name}
                </Typography>
                <Typography variant="subtitle2" className="grey">
                    {typeof (video?.views) !== "undefined" && millify(video?.views, { precision: 1 })}
                    &nbsp;views - {moment(video?.createdAt).fromNow()}
                </Typography>
            </Grid>
        </Grid>
    );
}

export default VideoRecommend;