import React from 'react';
import { Grid, Grow, Avatar, Typography, IconButton } from "@material-ui/core";
import moment from "moment";
import millify from "millify";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteVideo } from "./../redux/actions/video";
import DeleteIcon from '@material-ui/icons/Delete';

const VideoView = ({ owner, video, edit, channelView }) => {
    const history = useHistory();
    const dispatch = useDispatch();

    const handleChooseVideo = () => history.push(`/watch/${channelView ? video?._id : video?.video?._id}`);

    return (
        <>
            <Grow in className={!edit && "mt-3"}>
                <Grid item lg={!edit && 3} md={!edit && 4} sm={!edit && 6}>
                    {edit ? (
                        <>
                            <img alt="" width="100%" height="300" loading="lazy" src={video?.thumbnail} className="thumbnail" />
                        </>
                    ) : (
                        <Grid container wrap="nowrap">
                            <img alt="" width="300" height="200" src={channelView ? video?.thumbnail : video?.video?.thumbnail}
                                className="thumbnail pointer" onClick={handleChooseVideo} loading="lazy" />
                            {owner && (
                                <div id="del_video">
                                    <IconButton color="secondary" onClick={() => {
                                        dispatch(deleteVideo(video?._id));
                                        window.location.reload();
                                    }}>
                                        <DeleteIcon fontSize="large" />
                                    </IconButton>
                                </div>
                            )}
                        </Grid>
                    )}
                    <div className="m-2"></div>
                    <Grid container className="mb-1">
                        {!channelView && (
                            <Grid item xs={2}>
                                <Avatar className={!edit && "pointer"} onClick={() => history.push(`/channel/${video?.creator?._id}`)}
                                    src={edit ? JSON.parse(localStorage.getItem("MYProfile"))?.profile?.imageUrl : video?.creator?.imageUrl} />
                            </Grid>
                        )}
                        <Grid item xs={10}>
                            {!edit ? (
                                <>
                                    {channelView ? (
                                        <h6><a href={`/watch/${video?._id}`} className="white">{video?.title}</a></h6>
                                    ) : (
                                        <h6><a href={`/watch/${video?.video?._id}`} className="white">
                                            {video?.video?.title?.substring(0, 28)}{video?.video?.title?.length > 28 && " ..."}
                                        </a></h6>
                                    )}
                                    {!channelView && (
                                        <Typography variant="body2" className="grey" component={Link} to={`/channel/${video?.creator?._id}`}>
                                            {video?.creator?.name}
                                        </Typography>
                                    )}
                                    <Typography variant="body2" className="grey">
                                        {typeof (channelView ? video?.views : video?.video?.views) !== "undefined" &&
                                            millify(channelView ? video?.views : video?.video?.views, { precision: 1 })}
                                        &nbsp;views - {moment(channelView ? video?.createdAt : video?.video?.createdAt).fromNow()}
                                    </Typography>
                                </>
                            ) : (
                                <>
                                    <h6 style={{ marginLeft: "-30px" }}>{video?.title}</h6>
                                </>
                            )}
                        </Grid>
                    </Grid>
                    {edit && video?.tags?.map((t, i) => (
                        <span key={i} className="blue">{`#${t} `}</span>
                    ))}
                    {edit && (
                        <Typography className="mt-2" variant="body2">{video?.description}</Typography>
                    )}
                </Grid>
            </Grow>
        </>
    );
}

export default VideoView;