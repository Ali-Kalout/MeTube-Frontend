import React, { useEffect, useState } from 'react';
import { Button, Grid, Paper, TextField } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { getVideos, getVideoBySearch } from "./../redux/actions/video";
import VideoView from "./../components/VideoView";
import { useHistory, useLocation } from "react-router-dom"; // pagination 

import Paginate from '../components/Pagination';

const useQuery = () => new URLSearchParams(useLocation().search);

const Home = ({ vids }) => {
    const dispatch = useDispatch();
    const [pagey, setPage] = useState(1);
    const query = useQuery();
    const history = useHistory();
    const page = query.get('page') || 1;
    const searchQuery = query.get('?searchQuery');
    const [search, setSearch] = useState("");

    useEffect(() => pagey > 1 && dispatch(getVideos(pagey)), []);

    const HandleKeyPress = e => e.charCode === 13 && searchVideo();

    const searchVideo = () => {
        if (search.trim()) {
            dispatch(getVideoBySearch(search))
            history.push(`/search?searchQuery=${search || 'none'}`);
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
                {vids.map((v, i) => (
                    <VideoView key={i} video={v} />
                ))}
            </Grid>
            <Paper elevation={3} className="paginatePaper">
                <Paginate />
            </Paper>
        </div>
    )
}

export default Home;