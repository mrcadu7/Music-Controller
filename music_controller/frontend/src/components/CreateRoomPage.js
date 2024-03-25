import React, { useState } from "react";
import {
    TextField,
    Button,
    Grid,
    Typography,
    FormControlLabel,
    Radio,
    RadioGroup,
    FormControl,
    FormHelperText,
    Collapse,
    Alert
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";



export default function CreateRoomPage({ 
    guestCanPause = true, 
    votesToSkip = 2, 
    update = false, 
    roomCode = null,
  }) {

    const navigate = useNavigate();
  
    const [state, setState] = useState({
      guestCanPause,
      votesToSkip,
      errorMsg: "",
      successMsg: "",
    });
  
    const handleVotesChange = (e) => {
      setState({
        ...state,
        votesToSkip: e.target.value,
      });
    }
  
    const handleGuestCanPauseChange = (e) => {
      setState({
        ...state,
        guestCanPause: e.target.value === 'true' ? true : false,
      });
    }
  
    const handleRoomButtonPressed = () => {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          votes_to_skip: state.votesToSkip,
          guest_can_pause: state.guestCanPause,
        }),
      };
      fetch("/api/create-room", requestOptions)
        .then((response) => response.json())
        .then((data) => navigate("/room/" + data.code));
    }
  
    const handleUpdateButtonPressed = () => {

        const requestOptions = {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
            votes_to_skip: state.votesToSkip,
            guest_can_pause: state.guestCanPause,
            code: roomCode,
            }),
        };
        fetch("/api/update-room", requestOptions).then((response) => {
            if (response.ok) {
            setState({
                ...state,
                successMsg: "Room updated successfully!",

            });
            } else {
            setState({
                ...state,
                errorMsg: "Error updating room...",
            });
            }
            
        });
    }

    const renderCreateButtons = () => (
        <>
          <Grid item xs={12} align="center">
            <Button
              color="secondary"
              variant="contained"
              onClick={handleRoomButtonPressed}
            >
              Create Room
            </Button>
          </Grid>
          <Grid item xs={12} align="center">
            <Button
              color="primary"
              variant="contained"
              to="/"
              component={Link}
            >
              Back
            </Button>
          </Grid>
        </>
      );
      
      const renderUpdateButtons = () => (
        <Grid item xs={12} align="center">
          <Button
            color="primary" 
            variant="contained" 
            onClick={handleUpdateButtonPressed}
          >
            Update Room
          </Button>
        </Grid>
      );


    
    const title = update ? "Update Room" : "Create Room";

    return (
        <Grid container spacing={1}>
            <Grid item xs={12} align="center">
                <Collapse in={state.errorMsg != "" || state.successMsg != ""}>
                    {state.successMsg != "" ? (
                        <Alert
                            severity="success"
                            onClose={() => setState({ ...state, successMsg: "" })}
                        >
                            {state.successMsg}
                        </Alert>
                    ) : (
                        <Alert
                            severity="error"
                            onClose={() => setState({ ...state, errorMsg: "" })}
                        >
                            {state.errorMsg}
                        </Alert>
                    )}
                </Collapse>
            </Grid>
            <Grid item xs={12} align="center">
                <Typography component="h4" variant="h4">
                    {title}
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <FormControl component="fieldset">
                    <FormHelperText align="center">
                        Guest Control of Playback State
                    </FormHelperText>
                    <RadioGroup row 
                    defaultValue={guestCanPause.toString()} 
                    onChange={handleGuestCanPauseChange}
                    >
                        <FormControlLabel
                            value="true"
                            control={<Radio color="primary"/>}
                            label="Play/Pause"
                            labelPlacement="bottom"
                        />
                        <FormControlLabel
                            value="false"
                            control={<Radio color="secondary"/>}
                            label="No Control"
                            labelPlacement="bottom"
                        />
                    </RadioGroup>
                </FormControl>
            </Grid>
            <Grid item xs={12} align="center">
                <FormControl>
                    <TextField
                        required={true}
                        type="number"
                        onChange={handleVotesChange}
                        defaultValue={votesToSkip}
                        inputProps={{
                            min: 1,
                            style: { textAlign: "center" },
                        }}
                    />
                    <FormHelperText align="center">
                        Votes Required to Skip Song
                    </FormHelperText>
                </FormControl>
            </Grid>
            {update ? renderUpdateButtons() : renderCreateButtons()}

        </Grid>
    );
}

