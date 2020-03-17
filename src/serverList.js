import React, {useEffect, useState} from 'react';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import {makeStyles} from '@material-ui/core/styles';
import axios from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

require('dotenv').config();


const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        width: 500,
        //height: 450,
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.7)',
    },
}));

const ServerList = (props) => {
    const classes = useStyles();
    const [data, setData] = useState({servers: []});
    axios.defaults.headers.common = {'Authorization': `bearer ${props.token}`}

    const [open, setOpen] = React.useState(false);

    useEffect(() => {
        let region = props.region;
        const url = props.apiHost + "get_instances?region=" + region;

        const fetchData = async () => {
            const result = await axios(url);
            console.log(result.data);
            setData({servers: result.data});
        };

        fetchData();





    }, []);

    const handleClickOpen = () => {
            setOpen(true);
        };

        const handleClose = () => {
            setOpen(false);
        };

    if (data.servers.length > 0) {
        return (
            <div>
                <h2>{props.region}</h2>
                <GridList cellHeight={160} className={classes.gridList}>
                    )
                    {data.servers.map(function (item, index) {
                        let image = process.env.REACT_APP_STOPPEDVMIMG;
                        if (item.state === 16) { // 16 is a 'running' vm
                            image = process.env.REACT_APP_STARTEDVMIMG;
                        }

                        return (
                            <GridListTile key={item.tags.instanceid}>
                                <img src={image} alt="server"/>
                                <GridListTileBar
                                    title={item.tags['instanceid']}
                                    subtitle={<span>by: {item.tags.student}</span>}
                                    actionIcon={
                                        <IconButton aria-label={`info about something`} onClick={handleClickOpen}>
                                            <InfoIcon className={classes.icon}/>
                                        </IconButton>
                                    }

                                />
                                <Dialog
                                    open={open}
                                    onClose={handleClose}
                                    aria-labelledby="alert-dialog-title"
                                    aria-describedby="alert-dialog-description"
                                >
                                    <DialogTitle
                                        id="alert-dialog-title">{"Instance details"}</DialogTitle>
                                    <DialogContent>
                                        <DialogContentText id="alert-dialog-description">
                                            {JSON.stringify(item.tags)}
                                        </DialogContentText>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={handleClose} color="primary" autoFocus>
                                            Close
                                        </Button>
                                    </DialogActions>
                                </Dialog>
                            </GridListTile>
                        )
                    })
                    }
                </GridList>
            </div>

        );
    } else return (<h2>{props.region}: No EC2 machines</h2>)
};

export default ServerList;