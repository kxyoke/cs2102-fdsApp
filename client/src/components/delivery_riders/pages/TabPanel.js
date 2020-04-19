import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Grid from "@material-ui/core/Grid";
import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box p={3}>{children}</Box>}
        </Typography>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
}));

export default function SimpleTabs(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Tabs value={value} onChange={handleChange} aria-label="simple tabs example" centered>
                    <Tab label="Week One" {...a11yProps(0)} />
                    <Tab label="Week Two" {...a11yProps(1)} />
                    <Tab label="Week Three" {...a11yProps(2)} />
                    <Tab label="Week Four" {...a11yProps(3)} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                <Table size="lg">
                    <TableHead>
                        <TableRow>
                            <TableCell>Day</TableCell>
                            {props.timeRange.map( (exacttime) => (
                                    <TableCell> {exacttime} </TableCell>
                                )
                            )}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.schedule[0].map( (exacttime) =>
                            <TableRow>
                                {exacttime.map( (exactvalue) => exactvalue === "true" ?
                                    <TableCell>Working</TableCell> :
                                    <TableCell>{exactvalue}</TableCell> )}
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Table size="lg">
                    <TableHead>
                        <TableRow>
                            <TableCell>Day</TableCell>
                            {props.timeRange.map( (exacttime) => (
                                    <TableCell> {exacttime} </TableCell>
                                )
                            )}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.schedule[1].map( (exacttime) =>
                            <TableRow>
                                {exacttime.map( (exactvalue) => exactvalue === "true" ?
                                    <TableCell>Working</TableCell> :
                                    <TableCell>{exactvalue}</TableCell> )}
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <Table size="lg">
                    <TableHead>
                        <TableRow>
                            <TableCell>Day</TableCell>
                            {props.timeRange.map( (exacttime) => (
                                    <TableCell> {exacttime} </TableCell>
                                )
                            )}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.schedule[2].map( (exacttime) =>
                            <TableRow>
                                {exacttime.map( (exactvalue) => exactvalue === "true" ?
                                    <TableCell>Working</TableCell> :
                                    <TableCell>{exactvalue}</TableCell> )}
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TabPanel>
            <TabPanel value={value} index={3}>
                <Table size="lg">
                    <TableHead>
                        <TableRow>
                            <TableCell>Day</TableCell>
                            {props.timeRange.map( (exacttime) => (
                                    <TableCell> {exacttime} </TableCell>
                                )
                            )}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.schedule[3].map( (exacttime) =>
                            <TableRow>
                                {exacttime.map( (exactvalue) => exactvalue === "true" ?
                                    <TableCell>Working</TableCell> :
                                    <TableCell>{exactvalue}</TableCell> )}
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TabPanel>
            <Link to={{pathname:"/deliveryRider/editPTSchedule", state: {weekNum:value}}}>
                <Button renderAs="button">
                    <span>Edit Schedule</span>
                </Button>
            </Link>
        </div>
    );
}