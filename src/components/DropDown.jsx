import React from 'react';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import { Avatar, Typography, Grid } from "@material-ui/core";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MessageIcon from '@material-ui/icons/Message';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex'
    },
    paperRoot: {
        marginRight: theme.spacing(30),
        minWidth: "250px"
    },
}));

export default function DropDown({ profile }) {
    const dispatch = useDispatch();
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);

    const history = useHistory();
    const location = useLocation();

    const handleToggle = () => setOpen((prevOpen) => !prevOpen);

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    }

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        }
    }

    const prevOpen = React.useRef(open);

    const logout = () => {
        dispatch({ type: "LOGOUT" });
        history.push("/");
    }

    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);

    return (
        <div className={classes.root}>
            <div>
                <Button
                    ref={anchorRef}
                    aria-controls={open ? 'menu-list-grow' : undefined}
                    aria-haspopup="true"
                    onClick={handleToggle}
                >
                    <Avatar src={profile.imageUrl} />
                </Button>
                <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal className={classes.paperRoot}>
                    {({ TransitionProps, placement }) => (
                        <Grow
                            {...TransitionProps}
                            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                        >
                            <Paper style={{ padding: " 0 7px 7px 7px", backgroundColor: "#202020", color: "white" }}>
                                <ClickAwayListener onClickAway={handleClose}>
                                    <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                                        <Grid container spacing={5}>
                                            <Grid item xs={2}>
                                                <Avatar src={profile.imageUrl}></Avatar>
                                            </Grid>
                                            <Grid item xs={10}>
                                                <Typography variant="h6" noWrap>
                                                    {profile.name}
                                                </Typography>
                                                <Typography variant="body1" noWrap>
                                                    {profile.email}
                                                </Typography>
                                            </Grid>
                                        </Grid>

                                        <hr className="mt-2 mb-2"></hr>

                                        <MenuItem className="menu_item" onClick={() => {
                                            setOpen(false);
                                            history.push(`/channel/${profile?._id}`);
                                            window.location.reload();
                                        }}>
                                            <AccountBoxIcon fontSize="default" />&nbsp;
                                            Your Channel
                                        </MenuItem>

                                        <hr className="mt-2 mb-2"></hr>

                                        <Button variant="contained" style={{ marginTop: "10px" }} fullWidth color="secondary" size="small" onClick={() => {
                                            setOpen(false);
                                            logout();
                                        }}>
                                            <ExitToAppIcon fontSize="small" /> &nbsp;
                                            Sign out
                                        </Button>
                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Popper>
            </div>
        </div>
    );
}
