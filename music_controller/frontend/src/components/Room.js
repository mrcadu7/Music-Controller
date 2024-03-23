import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
    Button,
    Grid,
    Typography
} from "@mui/material";
import { useNavigate } from "react-router-dom";


export default function Room() {
    const [state, setState] = useState({
        votesToSkip: 2,
        guestCanPause: false,
        isHost: false,
    });
    const { roomCode } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch room details using roomCode
        fetch("/api/get-room" + "?code=" + roomCode)
            .then((response) => response.json())
            .then((data) => {
                setState({
                    votesToSkip: data.votes_to_skip,
                    guestCanPause: data.guest_can_pause,
                    isHost: data.is_host,
                });
            }).catch((error) => console.log("Error:", error));
    }, [roomCode]);

    const leaveButtonPressed = () => {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
        };
        fetch("/api/leave-room", requestOptions).then((_response) => {
            navigate("/");
        });
    };

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} align="center">
                <Typography variant="h4" component="h4">
                    Room: {roomCode}
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <Typography variant="h6" component="h6">
                    Votes: {state.votesToSkip}
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <Typography variant="h6" component="h6">
                    Guest Can Pause: {state.guestCanPause.toString()}
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <Typography variant="h6" component="h6">
                    Host: {state.isHost.toString()}
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <Button
                    color="secondary"
                    variant="contained"
                    onClick={leaveButtonPressed}
                >
                    SAIR
                </Button>
            </Grid>
        </Grid>
    );
}
