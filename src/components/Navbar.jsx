import React, { useEffect, useState } from 'react';
import {
    Drawer, makeStyles, IconButton, Button, Divider, Paper, TextField, Tooltip
} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import YouTubeIcon from '@material-ui/icons/YouTube';
import { useHistory, useLocation, Link } from "react-router-dom";
import VideoCallIcon from '@material-ui/icons/VideoCall';
import GoogleLogin from 'react-google-login';
import { useDispatch } from "react-redux";
import DropDown from "./DropDown";
import decode from "jwt-decode";
import { auth } from "./../redux/actions/auth";
import SearchIcon from '@material-ui/icons/Search';
import { getVideoBySearch } from "./../redux/actions/video";

const useStyles = makeStyles(theme => ({
    drawer: {
        width: 240,
        flexShrink: 0
    }
}));

const Icon = () => (
    <svg style={{ width: '20px', height: '20px' }} viewBox="0 0 24 24">
        <path
            fill="currentColor"
            d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12C5,7.9 8.2,4.73 12.2,4.73C15.29,4.73 17.1,6.7 17.1,6.7L19,4.72C19,4.72 16.56,2 12.1,2C6.42,2 2.03,6.8 2.03,12C2.03,17.05 6.16,22 12.25,22C17.6,22 21.5,18.33 21.5,12.91C21.5,11.76 21.35,11.1 21.35,11.1V11.1Z"
        />
    </svg>
);

const Navbar = () => {
    const location = useLocation();
    const history = useHistory();
    const dispatch = useDispatch();
    const classes = useStyles();
    const [search, setSearch] = useState("");
    const [openDrawer, setOpenDrawer] = useState(false);
    const [searchApper, setSearchApper] = useState(false);
    const [profile, setProfile] = useState(JSON.parse(localStorage.getItem("MYProfile"))?.profile);

    const toggle = () => setOpenDrawer(!openDrawer);

    useEffect(() => {
        if (localStorage.getItem("MYProfile")) {
            setProfile(JSON.parse(localStorage.getItem("MYProfile"))?.profile);

            const decodedToken = decode(JSON.parse(localStorage.getItem("MYProfile"))?.token);

            if (decodedToken.exp * 1000 < new Date().getTime()) {
                dispatch({ type: "LOGOUT" });
                history.push("/");
            }
        }
        else {
            setProfile(null);
        }
    }, [location]);

    const googleRes = res => {
        if (res.error) {
            console.log(res.error);
            alert('Google Sign In was unsuccessful. Try again later');
        }
        else {
            const profile = res?.profileObj;
            const token = res?.tokenId;

            dispatch(auth(profile, token, history));
        }
    }

    const HandleKeyPress = e => e.charCode === 13 && searchVideo();

    const searchVideo = () => {
        if (search.trim()) {
            dispatch(getVideoBySearch(search));
            history.push(`/search?searchQuery=${search}`);
        }
        else history.push("/");
    };

    return (
        <div className={classes.root} style={{ marginBottom: "10px" }}>
            <div className="nav-bar">
                {profile ? (
                    <IconButton color="inherit" className="pointer" onClick={toggle} id="toggle">
                        <MenuIcon fontSize="large" />
                    </IconButton>
                ) : (
                    <div className="ml-5"></div>
                )}
                <div className="nav-bar-brand pointer" onClick={() => {
                    history.push("/");
                    window.location.reload();
                }}>
                    <YouTubeIcon fontSize="large" />
                    <h3 id="name">&nbsp;MeTube</h3>
                </div>
                {profile ? (
                    <>
                        <div className="ml-auto mt-2 pointer" style={{ display: "flex" }}>
                            {searchApper && (
                                <TextField
                                    id="search"
                                    variant="outlined"
                                    value={search}
                                    onChange={e => setSearch(e.target.value)}
                                    onKeyPress={HandleKeyPress}
                                />
                            )}
                            <IconButton color="inherit" style={{ marginTop: "-10px", marginRight: "-7px" }} onClick={() => {
                                if (searchApper) searchVideo();
                                else setSearchApper(!searchApper);
                            }}>
                                <SearchIcon fontSize="large" />
                            </IconButton>
                            <IconButton color="inherit" style={{ marginTop: "-10px", marginRight: "5px" }} component={Link} to="/new">
                                <VideoCallIcon fontSize="large" />
                            </IconButton>
                            <Tooltip>
                                <DropDown profile={profile} />
                            </Tooltip>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="ml-auto mt-2 pointer" style={{ display: "flex" }}>
                            {searchApper && (
                                <TextField
                                    id="search"
                                    variant="outlined"
                                    value={search}
                                    onChange={e => setSearch(e.target.value)}
                                    onKeyPress={HandleKeyPress}
                                />
                            )}
                            <IconButton color="inherit" style={{ marginTop: "-10px", marginRight: "-7px" }} onClick={() => {
                                if (searchApper) searchVideo();
                                else setSearchApper(!searchApper);
                            }}>
                                <SearchIcon fontSize="large" />
                            </IconButton>
                            <GoogleLogin
                                clientId="988730621859-o3nt4dig01ja29nifuvavl678cbnarp4.apps.googleusercontent.com"
                                render={(renderProps) => (
                                    <Button color="inherit" style={{ height: "45px" }} className="ml-auto"
                                        onClick={renderProps.onClick} startIcon={<Icon />} disabled={renderProps.disabled} variant="outlined">
                                        Sign In
                                    </Button>
                                )}
                                onSuccess={googleRes}
                                onFailure={googleRes}
                                cookiePolicy="single_host_origin"
                            />
                        </div>
                    </>
                )}
            </div>
            <Drawer
                variant="persistent"
                anchor="left"
                open={openDrawer}
            >
                <div className="nav-bar">
                    {profile ? (
                        <IconButton color="inherit" className="pointer" onClick={toggle} id="toggle">
                            <MenuIcon fontSize="large" />
                        </IconButton>
                    ) : (
                        <div className="ml-5"></div>
                    )}
                    <div className="nav-bar-brand pointer" onClick={() => {
                        history.push("/");
                        window.location.reload();
                    }}>
                        <YouTubeIcon fontSize="large" />
                        <h3 id="name">&nbsp;MeTube</h3>
                    </div>
                </div>
                <Divider />
            </Drawer>
        </div>
    );
}

export default Navbar;