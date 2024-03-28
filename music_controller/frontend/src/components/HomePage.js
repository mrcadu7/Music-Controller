import React, { useState, useEffect } from "react";
import CreateRoomPage from "./CreateRoomPage";
import RoomJoinPage from "./RoomJoinPage";
import Room from "./Room";
import {
    Button,
    Grid,
    Typography,
    ButtonGroup
} from "@mui/material";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import Info from "./Info";

import styles from './HomePage.module.css'

function HomePageContent({ setRoomCode }) {
    const navigate = useNavigate();

    useEffect(() => {
        fetch("/api/user-in-room")
            .then((response) => response.json())
            .then((data) => {
                setRoomCode(data.code);
                if (data.code) {
                    navigate(`/room/${data.code}`);
                }
            });
    }, [navigate, setRoomCode]);

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} align="center">
                <Typography variant="h3" compact="h3" className={styles.title}>
                    House Party
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <ButtonGroup disableElevation variant="contained" color="primary">
                    <Button color="primary" to="/join" component={Link}>Join Room</Button>
                    <Button color="inherit" to="/info" component={Link}>Info</Button>
                    <Button color="secondary" to="/create" component={Link}>Create Room</Button>
                </ButtonGroup>
            </Grid>
        </Grid>
    );
}

export default function HomePage() {
    const [roomCode, setRoomCode] = useState(null);

    return (
        <Router>
            <Routes>
                <Route path="/" element={roomCode ? null : <HomePageContent setRoomCode={setRoomCode} />} />
                <Route path="/join" element={<RoomJoinPage />} />
                <Route path="/info" element={<Info />} />
                <Route path="/create" element={<CreateRoomPage />} />
                <Route path="/room/:roomCode" element={<Room />} />
            </Routes>
        </Router>
    );
}
