import React, { useState, useEffect } from 'react';
import { Box, Grid2 as Grid, Typography, IconButton, Divider, Button } from '@mui/material';
import { useParams } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import { API_ENDPOINTS } from '../../utils/Mapping';
import { ApiRouter } from '../../utils/Api';
import { formatDate } from '../../utils/Helpers';
import { mapping } from '../../utils/Mapping';

export default function Blog({ setDrawerOpen }) {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState([]);
    useEffect(() => {
        ApiRouter.get(API_ENDPOINTS.POST(slug))
        .then(data => {
            if (data.detail) navigate('/')
            else setPost(data);
        })
    }, []);

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
                <Grid item="true" xs={12}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', overflow: 'hidden', borderRadius: 1, mb: 2,}}>
                        <Box component="img" src={post.image} alt={post.title} sx={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 1 }}/>
                    </Box>
                </Grid>
                {post.content.split('\n').map((paragraph, index) => (
                    <Typography variant="body1" key={index} sx={{ mb: 2 }}>
                        {paragraph}
                    </Typography>
                ))}
                <Typography variant="body1" key={"s"} sx={{ mb: 2 }}>
                    <Button variant="outlined" sx={{ color: 'white', mb: 1, mr: 1 }} color="white">
                        {formatDate(post.publish_date)}
                    </Button>
                    <Button variant="outlined" sx={{ color: 'white', mb: 1 }} color="white" onClick={() => navigate(mapping['Blog'].getPath())}>
                        Back
                    </Button>
                </Typography>
            </>)}
        </Box>
    );
}
