import React, { useEffect, useState } from 'react';
import { Grid } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { getVideos } from "./../redux/actions/video";
import VideoView from "./../components/VideoView";

const Home = ({ vids }) => {
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);

    useEffect(() => page > 1 && dispatch(getVideos(page)), [page]);

    return (
        <div>
            <Grid container spacing={3} justify="center">
                {vids.map((v, i) => (
                    <VideoView key={i} video={v} />
                ))}
            </Grid>
            <button onClick={() => setPage(page + 1)}>more</button>
        </div>
    )
}

export default Home;