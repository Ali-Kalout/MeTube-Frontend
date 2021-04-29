import React, { useState, useEffect } from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import { Container } from "@material-ui/core";
import { ToastContainer } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { getVideos } from "./redux/actions/video";

import "./styles.css";

import Navbar from "./components/Navbar";

import Home from './pages/Home';
import Watch from "./pages/Watch";
import NewVid from "./pages/NewVid";
import Channel from "./pages/Channel";

const App = () => {
    const dispatch = useDispatch();
    const vids = useSelector(state => state.videos);

    useEffect(() => dispatch(getVideos(1)), []);

    return (
        <>
            <Navbar />

            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false}
                closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover newestOnTop />

            <Container maxWidth="lg">
                <Switch>
                    <Route exact path="/" component={() => <Home vids={vids} />} />
                    <Route exact path="/channel/:id" component={Channel} />
                    <Route exact path="/watch/:id" component={({ match }) => {
                        const vid = vids.filter(v => String(match.params.id) === String(v?.video?._id))[0];
                        return <Watch vid={vid?.video} />;
                    }} />
                    <Route exact path="/new" component={NewVid} />

                    <Redirect to="/" />
                </Switch>
            </Container>
        </>
    );
}

export default App;