import React, { useState } from 'react';
import { Button, Grid, Paper, TextField } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { getVideos, getVideoBySearch } from "./../redux/actions/video";
import VideoView from "./../components/VideoView";
import { useHistory, useLocation } from "react-router-dom"; // pagination 

import Paginate from '../components/Pagination';

const useQuery = () => new URLSearchParams(useLocation().search);

const Home = () => {
    const dispatch = useDispatch();
    const query = useQuery();
    const history = useHistory();
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');
    const [search, setSearch] = useState("");
    const vids = useSelector(state => state.videos.videos);

    const HandleKeyPress = e => e.charCode === 13 && searchVideo();

    const searchVideo = () => {
        if (search.trim()) {
            dispatch(getVideoBySearch(search));
            history.push(`/search?searchQuery=${search}`);
        }
        else history.push("/");
    };

    return (
        <div>
            <Paper style={{ padding: "10px" }}>
                <TextField
                    name="search"
                    variant="outlined"
                    label="Search Videos"
                    value={search}
                    fullWidth
                    onChange={e => setSearch(e.target.value)}
                    onKeyPress={HandleKeyPress}
                />
                <Button onClick={searchVideo} color="primary">Search</Button>
            </Paper>
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