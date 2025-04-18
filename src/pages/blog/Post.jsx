import React, { useState, useEffect } from 'react';
import { Box, Grid2 as Grid, Typography, IconButton, Divider, Button } from '@mui/material';
import { useParams } from "react-router-dom";
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import { MenuIcon } from '../../icon/MenuIcon';
import { useNavigate } from 'react-router-dom';
import { API_ENDPOINTS } from '../../utils/Endpoints';
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
        <Box sx={{ backgroundColor: 'rgba(5,10,14,1.00)', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'left', color: 'white', p: 2, px: { xs: 2, sm: 2, md: 10, lg: 10}  }}>
            <IconButton sx={{ position: 'absolute', top: { xs: 16, md: 64 }, left: { xs: 16, md: 64 }, color: 'white' }} onClick={setDrawerOpen}>
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
                <Typography variant="body1" sx={{ mb: 2 }}
                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(marked.parse(post.content)) }}
                />
                <Typography variant="body1" key={"s"} sx={{ mb: 2 }}>
                    <Button variant="outlined" sx={{ color: 'white', mb: 1, mr: 1 }} color="white">
                        {formatDate(post.publish_date)}
                    </Button>
                    <Button variant="outlined" sx={{ color: 'white', mb: 1 }} color="white" onClick={() => navigate(mapping['Blog'].getPath())}>
                        Back
                    </Button>
                </Typography>
            </>)}
            <Divider sx={{ width: '100%', backgroundColor: 'rgba(248, 253, 0, 1.00)', mt: 2, mb: 2 }} />
            <Typography variant="body2" align="center" sx={{ mt: 2, color: 'rgba(255, 255, 255, 0.6)' }}>
                © {new Date().getFullYear()} Viswamedha Nalabotu
            </Typography>
        </Box>
    );
}
