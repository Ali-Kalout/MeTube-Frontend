import React from 'react';
import { Grid, Paper } from "@material-ui/core";
import { useSelector } from "react-redux";
import VideoView from "./../components/VideoView";
import { useLocation } from "react-router-dom"; // pagination 

import Paginate from '../components/Pagination';

const useQuery = () => new URLSearchParams(useLocation().search);

const Home = () => {
    const query = useQuery();
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');
    const vids = useSelector(state => state.videos.videos);

    return (
        <div>
            <Grid container spacing={3} justify="center">
                {vids?.map((v, i) => (
                    <VideoView key={i} video={v} />
                ))}
            </Grid>
            <Paper elevation={3} className="paginatePaper">
                <Paginate page={page} />
            </Paper>
        </div>
    )
}

export default Home;