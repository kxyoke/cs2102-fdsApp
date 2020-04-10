import React, {useState}from 'react'
import { Link,Redirect } from 'react-router-dom'
import classNames from "classnames";
import CssBaseline from "@material-ui/core/CssBaseline";
import IconButton from "@material-ui/core/IconButton";
import Hidden from "@material-ui/core/Hidden";
import Poppers from "@material-ui/core/Popper/Popper";
import Grow from "@material-ui/core/Grow/Grow";
import Paper from "@material-ui/core/Paper/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import MenuList from "@material-ui/core/MenuList/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import Divider from "@material-ui/core/Divider";
import {makeStyles} from "@material-ui/core/styles";
import Person from "@material-ui/icons/Person";
import ListItem from "@material-ui/core/ListItem";
import axios from "axios";


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
}));

export default function HeaderIcons() {
    const classes = useStyles();
    const [openProfile, setOpenProfile] = React.useState(null);
    const handleClickProfile = event => {
        if (openProfile && openProfile.contains(event.target)) {
            setOpenProfile(null);
        } else {
            setOpenProfile(event.currentTarget);
        }
    };
    const handleCloseProfile = () => {
        setOpenProfile(null);
    };
    const [navigate, setNavigate] = useState(false);

    function logout(e) {
        e.preventDefault();
        console.log('logout')
        axios.post('/logout').then(res=> {
            if(res.status === 200) {
                alert("logout successfully");
                setNavigate(true);
            }
        })
    }

    return (
        <div className={classes.root}>
            <CssBaseline />
                <div className={classes.manager}>
                    <IconButton
                        color={window.innerWidth > 959 ? "transparent" : "white"}
                        justIcon={window.innerWidth > 959}
                        simple={!(window.innerWidth > 959)}
                        aria-owns={openProfile ? "profile-menu-list-grow" : null}
                        aria-haspopup="true"
                        onClick={handleClickProfile}
                        className={classes.buttonLink}
                    >
                        <Person className={classes.icons} />
                        <Hidden mdUp implementation="css">
                            <p className={classes.linkText}>Profile</p>
                        </Hidden>
                    </IconButton>
                    <Poppers
                        open={Boolean(openProfile)}
                        anchorEl={openProfile}
                        transition
                        disablePortal
                        className={
                            classNames({ [classes.popperClose]: !openProfile }) +
                            " " +
                            classes.popperNav
                        }
                    >
                        {({ TransitionProps, placement }) => (
                            <Grow
                                {...TransitionProps}
                                id="profile-menu-list-grow"
                                style={{
                                    transformOrigin:
                                        placement === "bottom" ? "center top" : "center bottom"
                                }}
                            >
                                <Paper>
                                    <ClickAwayListener onClickAway={handleCloseProfile}>
                                        <MenuList role="menu">
                                            <MenuItem
                                                onClick={handleCloseProfile}
                                                className={classes.dropdownItem}
                                            >
                                                Profile
                                            </MenuItem>
                                            <MenuItem
                                                onClick={handleCloseProfile}
                                                className={classes.dropdownItem}
                                            >
                                                Settings
                                            </MenuItem>
                                            <Divider light />
                                            <MenuItem
                                                onClick={handleCloseProfile}
                                                className={classes.dropdownItem}
                                            >
                                                <div onClick={logout}
                                                     style={{display: "flex", float: 'right'}}>
                                                       Logout
                                                    {navigate ? <Redirect to="/"/> : null}
                                                </div>
                                            </MenuItem>
                                        </MenuList>
                                    </ClickAwayListener>
                                </Paper>
                            </Grow>
                        )}
                    </Poppers>
                </div>
        </div>
    )
}


