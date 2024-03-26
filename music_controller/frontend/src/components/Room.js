import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
    Button,
    Grid,
    Typography
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import CreateRoomPage from "./CreateRoomPage";
import MusicPlayer from "./MusicPlayer";


export default function Room() {
    const [state, setState] = useState({
        votesToSkip: 2,
        guestCanPause: false,
        isHost: false,
        showSettings: false,
        spotifyAuthenticated: false,
        song: {}
    });
    const { roomCode } = useParams();
    const navigate = useNavigate();

    const getRoomDetails = () => {
        fetch("/api/get-room" + "?code=" + roomCode)
            .then((response) => response.json())
            .then((data) => {
                setState({
                    votesToSkip: data.votes_to_skip,
                    guestCanPause: data.guest_can_pause,
                    isHost: data.is_host
                });
                if (data.is_host) { 
                    authenticateSpotify();
                }
            }).catch((error) => console.log("Error:", error));
    }
    
    useEffect(() => {
        getRoomDetails();
        const interval = setInterval(getCurrentSong, 1000);
        return () => clearInterval(interval);
    }, [roomCode]);


    const authenticateSpotify = () => {
        fetch("/spotify/is-authenticated")
            .then((response) => response.json())
            .then((data) => {
                setState(prevState => ({
                    ...prevState,
                    spotifyAuthenticated: data.status,
                }));
                console.log(data.status)
                if (!data.status) {
                    fetch("/spotify/get-auth-url").then((response) => response.json()).then((data) => {
                        window.location.replace(data.url);
                    })
                }
            }).catch((error) => console.log("Error:", error));
    }

    const getCurrentSong = () => {
        fetch("/spotify/current-song").then((response) => {
            if (!response.ok || response.status === 204) {
                return {};
            }
            return response.json();
        }).then((data) => {
            setState(prevState => ({
                ...prevState,
                song: data
            }));
            console.log(data)
        })
    }
    

    const leaveButtonPressed = () => {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
        };
        fetch("/api/leave-room", requestOptions).then((_response) => {
            navigate("/");
        });
    };

    const updateShowSettings = (value) => {
        setState({
            ...state,
            showSettings: value,
        });
    }

    const renderSettings = () => {
        return (
            <Grid container spacing={1}>
                <Grid item xs={12} align="center">
                    <CreateRoomPage update={true} 
                    votesToSkip={state.votesToSkip} 
                    guestCanPause={state.guestCanPause} 
                    roomCode={roomCode}
                    />
                </Grid>
                <Grid item xs={12} align="center">
                    <Button
                        color="secondary"
                        variant="contained"
                        onClick={() => {getRoomDetails()}}
                    >
                        Close
                    </Button>
                </Grid>
            </Grid>
        )}

    const renderSettingsButton = () => {
        return state.isHost ? (
            <Grid item xs={12} align="center">
                <Button
                    color="primary"
                    variant="contained"
                    onClick={() => updateShowSettings(true)}
                >
                    Settings
                </Button>
            </Grid>
        ) : null;
    }


    if (state.showSettings) {
        return renderSettings();
    }

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} align="center">
                <Typography variant="h4" component="h4">
                    Room: {roomCode}
                </Typography>
            </Grid>
            <MusicPlayer {...state.song} />
            { state.isHost ? renderSettingsButton() : null }
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
