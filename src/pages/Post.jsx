import React, { useState, useEffect } from 'react';
import { Box, Grid2 as Grid, Typography, IconButton, Divider, Button } from '@mui/material';
import { useParams } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import { ENDPOINTS } from '../utils/Endpoints';
import { ApiRouter } from '../utils/Api';

export default function Blog({ setDrawerOpen }) {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState([]);
    useEffect(() => {
        ApiRouter.get(ENDPOINTS.POST(slug))
        .then(data => {
            if (data.detail) navigate('/')
            else setPost(data);
        })
    }, []);

    const formatDate = (dateString) => {
        try {
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            return new Intl.DateTimeFormat('en-US', options).format(new Date(dateString));
        }
        catch (error) {
            return '';
        }
    };

    return (
        <Box sx={{ backgroundColor: 'rgba(5,10,14,1.00)', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'left', color: 'white', p: 3, px: 10 }}>
            <IconButton sx={{ position: 'absolute', top: 64, left: 64, color: 'white' }} onClick={setDrawerOpen}>
                <MenuIcon />
            </IconButton>
            { post && post.heading && (<>
                <Typography variant="h2" align="center" sx={{ mt: 3 }} gutterBottom>
                    {post.heading}
                </Typography>
                <Typography variant="h4" align="center" sx={{ mt: 2 }} gutterBottom>
                    {post.subheading}
                </Typography>
                {post.content.split('\n').map((paragraph, index) => (
                    <Typography variant="body1" key={index} sx={{ mb: 2 }}>
                        {paragraph}
                    </Typography>
                ))}
            </>)}
            <Typography variant="body1" key={"s"} sx={{ mb: 2 }}>
                <Button variant="outlined" sx={{ color: 'white', mb: 1, mr: 1 }} color="white">
                    {formatDate(post.publish_date)}
                </Button>
                <Button variant="outlined" sx={{ color: 'white', mb: 1 }} color="white" onClick={() => navigate('/')}>
                    Back
                </Button>
            </Typography>
        </Box>
    );
}
