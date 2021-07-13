import React from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import { Container } from "@material-ui/core";
import { ToastContainer } from "react-toastify";

import "./styles.css";

import Navbar from "./components/Navbar";

import Home from './pages/Home';
import Watch from "./pages/Watch";
import NewVid from "./pages/NewVid";
import Channel from "./pages/Channel";

const App = () => {
    const profile = localStorage.getItem("MYProfile");

    return (
        <>
            <Navbar />

            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false}
                newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />

            <Container maxWidth="lg">
                <Switch>
                    <Route exact path="/" component={() => <Home/>} />
                    <Route exact path="/search" component={() => <Home/>} /> {/* ?searchQuery
                        after searching the searched videos will be in normal videos place */}
                    <Route exact path="/channel/:id" component={Channel} />
                    {/* <Route exact path="/watch/:id" component={({ match }) => {
                        const vid = vids.filter(v => String(match.params.id) === String(v?.video?._id))[0];
                        return <Watch vid={vid?.video} />;
                    }} /> */}
                    <Route exact path="/watch/:id" component={Watch} />
                    <Route exact path="/new" component={() => (profile ? <NewVid /> : <Redirect to="/" />)} />

                    <Redirect to="/" />
                </Switch>
            </Container>
        </>
    );
}

export default App;