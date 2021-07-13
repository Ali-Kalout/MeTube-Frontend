import React, { useState, useEffect } from 'react';
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
    const [like, setLike] = useState(false);
    const [dislike, setDislike] = useState(false);
    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);

    useEffect(() => {
        if (currentVideo) {
            if (currentVideo?.video?.dislikes?.findIndex(id => id === user?.googleId) !== -1) setDislike(true);
            if (currentVideo?.video?.likes?.findIndex(id => id === user?.googleId) !== -1) setLike(true);
            setLikes(currentVideo?.video?.likes?.length);
            setDislikes(currentVideo?.video?.dislikes?.length);
        }
    }, [currentVideo]);

    const likeV = () => {
        if (!like) {
            if (dislike) {
                setDislike(false);
                setDislikes(dislikes - 1);
            }
            setLike(true);
            setLikes(likes + 1);
        } else {
            setLikes(likes - 1);
            setLike(false);
        }
        dispatch(likeVideo(currentVideo?.video?._id));
        console.log(likes);
    }

    const dislikeV = () => {
        if (!dislike) {
            if (like) {
                setLike(false);
                setLikes(likes - 1);
            }
            setDislike(true);
            setDislikes(dislikes + 1);
        } else {
            setDislikes(dislikes - 1);
            setDislike(false);
        }
        dispatch(dislikeVideo(currentVideo?.video?._id));
    }

    return (
        <>
            <span className={!like ? "grey" : "blue"}>
                <IconButton disabled={!user} color="inherit" onClick={() => likeV()}>
                    <ThumbUpIcon />
                </IconButton>
                <b>{typeof (likes) !== "undefined" && millify(likes, { precision: 1 })}</b>
            </span>&nbsp;
            <span className={!dislike ? "grey" : "blue"}>
                <IconButton disabled={!user} color="inherit" onClick={() => dislikeV()}>
                    <ThumbDownAltIcon />
                </IconButton>
                <b>{typeof (dislikes) !== "undefined" && millify(dislikes, { precision: 1 })}</b>
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