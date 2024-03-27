import React, { Component } from "react";
import {
    Card,
    Grid,
    Typography,
    IconButton,
    LinearProgress
} from "@mui/material";
import {
    PlayArrow,
    Pause,
    SkipNext
} from "@mui/icons-material";


export default function MusicPlayer(props) {

    const skipSong = () => {
        fetch('/spotify/skip', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }


    const pauseSong = () => {
        fetch('/spotify/pause', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    const playSong = () => {
        fetch('/spotify/play', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    const songProgress = (props.time / props.duration) * 100;

    return (
        <Card >
            <Grid container alignItems="center">
                <Grid item align="center" xs={4}>
                    <img src={props.image_url} height="100%" width="100%" />
                </Grid>
                <Grid item align="center" xs={8}>
                    <Typography component="h5" variant="h5">
                        {props.title}
                    </Typography>
                    <Typography color="textSecondary" variant="subtitle1">
                        {props.artist}
                    </Typography>
                    <div>
                    <IconButton
                            onClick={() => {
                            props.is_playing ? pauseSong() : playSong();
                            }}
                        >
                            {props.is_playing ? <Pause /> : <PlayArrow />}
                        </IconButton>
                        <IconButton onClick={() => skipSong()}>
                            <SkipNext />
                        </IconButton>
                        <Typography variant="subtitle1">
                            ({props.votes} / {props.votes_required}) 
                        </Typography>
                    </div>
                </Grid>
            </Grid>
            <LinearProgress variant="determinate" value={songProgress} />
        </Card>
    );
}