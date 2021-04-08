import React from 'react';
import { Container, Grid } from "@material-ui/core";
import VideoView from "./../components/VideoView";

const Home = ({ vids }) => {
    return (
        <div>
            <Grid container spacing={3} justify="center">
                {vids.map((v, i) => (
                    <VideoView key={i} video={v} />
                ))}
            </Grid>
        </div>
    )
}

export default Home;