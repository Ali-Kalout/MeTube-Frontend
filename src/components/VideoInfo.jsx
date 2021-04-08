import React, { useState } from 'react';
import millify from "millify";
import { IconButton } from "@material-ui/core";
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import ShareIcon from '@material-ui/icons/Share';
import { likeVideo, dislikeVideo } from "./../redux/actions/video";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const VideoInfo = ({ currentVideo }) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("MYProfile"))?.profile);
    const dispatch = useDispatch();

    return (
        <>
            <span className={currentVideo?.video?.likes?.findIndex(id => id === user?.googleId) === -1 ? "grey" : "blue"}>
                <IconButton disabled={!user} color="inherit" onClick={() => dispatch(likeVideo(currentVideo?.video?._id))}>
                    <ThumbUpIcon />
                </IconButton>
                <b>{typeof (currentVideo?.video?.likes) !== "undefined" && millify(currentVideo?.video?.likes?.length, { precision: 1 })}</b>
            </span>&nbsp;
            <span className={currentVideo?.video?.dislikes?.findIndex(id => id === user?.googleId) === -1 ? "grey" : "blue"}>
                <IconButton disabled={!user} color="inherit" onClick={() => dispatch(dislikeVideo(currentVideo?.video?._id))}>
                    <ThumbDownAltIcon />
                </IconButton>
                <b>{typeof (currentVideo?.video?.dislikes) !== "undefined" && millify(currentVideo?.video?.dislikes?.length, { precision: 1 })}</b>
            </span>
            <CopyToClipboard className="ml-5 grey" text={window.location.href} onCopy={(window.location.href, () =>
                toast.info("Link copied to clipboard !", {
                    position: "top-right", autoClose: 5000, hideProgressBar: false,
                    closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined,
                })
            )}>
                <span>
                    <IconButton color="inherit">
                        <ShareIcon />
                        <span style={{ fontSize: "18px" }}>&nbsp; Link</span>
                    </IconButton>
                </span>
            </CopyToClipboard>
        </>
    );
}

export default VideoInfo;