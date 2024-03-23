import React, { useState, useEffect } from "react";
import {
    TextField,
    Button,
    Grid,
    Typography
} from "@mui/material";

import { Link, useNavigate } from "react-router-dom";

export default function RoomJoinPage() {
    const [roomCode, setRoomCode] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleTextFieldChange = (e) => {
        setRoomCode(e.target.value);
    }

    const roomButtonPressed = () => {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                code: roomCode
            }),
        };
        fetch("/api/join-room", requestOptions).then((response) => {
            if (response.ok) {
                navigate("/room/" + roomCode);
            } else {
                setError("Room not found.");
            }
        }).catch((error) => {
            setError(error.message);
        })
    }

    return (
        <Grid container spacing={1}>
            <Grid item xs={12} align="center">
                <Typography component="h4" variant="h4">
                    Join A Room
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <TextField
                    error={error !== ""}
                    label="Code"
                    placeholder="Enter a Room Code"
                    value={roomCode}
                    helperText={error}
                    variant="outlined"
                    onChange={handleTextFieldChange}
                />
            </Grid>
            <Grid item xs={12} align="center">
                <Button
                    variant="contained"
                    color="primary"
                    onClick={roomButtonPressed}
                >
                    Entrar na sala
                </Button>
            </Grid>
            <Grid item xs={12} align="center">
                <Button
                    variant="contained"
                    color="secondary"
                    to="/"
                    component={Link}
                >
                    Voltar
                </Button>
            </Grid>
        </Grid>
    )
}
