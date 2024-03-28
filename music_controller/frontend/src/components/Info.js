import React, { useState, useEffect } from "react";
import {
    Button,
    Grid,
    Typography,
    Card,
    IconButton
} from "@mui/material";
import {
    NavigateBefore,
    NavigateNext
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import {FaGithub, FaLinkedin} from 'react-icons/fa'

import styles from './Info.module.css'


const pages = {
    ABOUT: 'pages.about',
    SOCIAL: 'pages.social'
}

export default function Info(props) {
    const [page, setPage] = useState(pages.ABOUT);

    function AboutInfo() {
        return (
            <div>
                <Typography variant="h6" compact="h6">
                    Sobre o House Party:
                </Typography>
                <br />
                <Typography variant="body1" compact="body1" className={styles.text}>
                    O House Party é um "controle remoto" para o som local. Ele permite que o host crie uma sala e os usuários se conectem a ela. Uma vez conectados, os usuários podem controlar a reprodução das músicas.
                </Typography>
                <Typography variant="body1" compact="body1" className={styles.text}>
                    É a solução perfeita para festas e reuniões onde todos querem ter uma palavra a dizer sobre a música que está sendo tocada. Com o House Party, todos têm uma voz!
                </Typography>
            </div>
        )
    }
    
    
    function SocialInfo() {
        return (
            <div>
                <Typography variant="h6" compact="h6" className={styles.text}>
                    Onde me encontrar:
                </Typography>
                <br />
                <Grid container spacing={1} justifyContent="center">
                    <Grid item>
                        <a href="https://github.com/mrcadu7" target="_blank" rel="noopener noreferrer">
                            <FaGithub size={32} />
                        </a>
                    </Grid>
                    <Grid item>
                        <a href="https://www.linkedin.com/in/mrcadu7/" target="_blank" rel="noopener noreferrer">
                            <FaLinkedin size={32} />
                        </a>
                    </Grid>
                </Grid>
            </div>
        )
    }

    return (
        <Grid container spacing={1}>
            <Card align="center">
                <Grid item xs={12} align="center">
                    <Typography variant="h4" compact="h4">
                        O que é House Party?
                    </Typography>
                </Grid>
                <Grid item xs={12} align="center">
                    <div>
                        {page === pages.ABOUT ? <AboutInfo /> : <SocialInfo />}
                    </div>
                </Grid>
                <Grid item xs={12} align="center">
                    <IconButton onClick={() => { 
                        page === pages.SOCIAL ? setPage(pages.ABOUT) : setPage(pages.SOCIAL)
                    }}>
                        {page === pages.SOCIAL ? <NavigateBefore /> : <NavigateNext />}
                    </IconButton>
                </Grid>
            </Card>
            <Grid item xs={12} align="center"> 
                <br />
                <Button 
                    color="secondary" 
                    variant="contained" 
                    to="/" 
                    component={Link}
                    style={{ 
                        position: 'absolute', 
                        left: '50%', 
                        transform: 'translate(-50%, -50%)',
                    }}
                >
                    Back
                </Button>
            </Grid>
        </Grid>
    )
}