import React, { useState, useEffect } from 'react';
import { Box, Grid2 as Grid, Chip, Typography, IconButton, Divider, Button } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import { API_ENDPOINTS } from '../../utils/Mapping';
import { ApiRouter } from '../../utils/Api';
import { mapping } from '../../utils/Mapping';
import { formatDate } from '../../utils/Helpers';

export default function Blog({ setDrawerOpen }) {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [tags, setTags] = useState([]);
    const [selectedTag, setSelectedTag] = useState(null);

    useEffect(() => {
        ApiRouter.get(API_ENDPOINTS.POSTS())
            .then(setPosts);
        ApiRouter.get(API_ENDPOINTS.TAGS())
            .then(setTags);
    }, []);

    const handleTagClick = (name) => {
        setSelectedTag(name === selectedTag ? null : name);
    };

    const filteredPosts = (selectedTag 
        ? posts.filter(post => post.tags.some(tag => tag.name === selectedTag)) 
        : posts
    ).sort((a, b) => new Date(b.publish_date) - new Date(a.publish_date));

    return (
        <Box sx={{ backgroundColor: 'rgba(5,10,14,1.00)', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'white', p: 3, px: 10 }}>
            <IconButton sx={{ position: 'absolute', top: 64, left: 64, color: 'white' }} onClick={setDrawerOpen}>
                <MenuIcon />
            </IconButton>
            <Typography variant="h2" align="center" sx={{ mt: 5 }} gutterBottom>
                Blog
            </Typography>
            <Typography variant="body1" align="center" sx={{ mb: 4 }}>
                This is a collection of random pieces of information, stories, and experiences I have encountered/experienced.
            </Typography>
            <Typography variant="body1" align="center" sx={{ mb: 4 }}>
                {tags.map((tag, index) => (
                    <Button key={index} variant={tag.name === selectedTag ? "contained" : "outlined"} sx={{ color: 'white', ml: 2, mb: 2 }} color="white" onClick={() => handleTagClick(tag.name)}>
                        {tag.name}
                    </Button>    
                ))}
            </Typography>           
            <Grid container direction="column" alignItems="left" spacing={4} sx={{ width: '100%',  maxWidth: {xs: '100%',sm: '95%', md: '90%', lg: '85%', xl: '80%'}}}>
                {filteredPosts.map((post, index) => (
                    <React.Fragment key={index}>
                        <Grid container spacing={2} display="flex" position="relative">
                            <Grid item="true" xs={12} md="auto" sx={{ flex: 1 }}>
                                <Button variant="outlined" sx={{ color: 'white', mb: 1 }} color="white">
                                    {formatDate(post.publish_date)}
                                </Button>
                                <Typography variant="h5" sx={{ mb: 1 }}>
                                    {post.heading}
                                </Typography>
                                <Typography variant="body1" sx={{ mb: 1 }}>
                                    {post.content.length > 100 ? `${post.content.substring(0, 100)}...` : post.content}
                                </Typography>
                                {post.tags.map((tag) => 
                                    <Chip key={tag.name} label={tag.name} variant="outlined" sx={{color: "white", marginLeft: "10px"}}/>
                                )}
                                <Button onClick={() => navigate(mapping['Post'].getPath(post.slug))} sx={{ color: '#fdf800', display: 'flex', alignItems: 'center' }} endIcon={<ArrowForwardIcon sx={{ color: '#fdf800' }} />}>
                                    Read more
                                </Button>
                            </Grid>
                            <Grid item="true" xs={12} md={4} sx={{ display: 'flex', justifyContent: 'center', mt: { xs: 2, md: 0 } }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '200px', position: 'relative', overflow: 'hidden', borderRadius: 1 }}>
                                    <Box component="img" src={post.image} alt={post.title} sx={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 1 }} />
                                </Box>
                            </Grid>
                        </Grid>
                        {index < filteredPosts.length - 1 && (
                            <Divider sx={{ width: '100%', backgroundColor: 'rgba(0,240,255,1.00)', mt: 2, mb: 2 }} />
                        )}
                    </React.Fragment>
                ))}
            </Grid>
        </Box>
    );
}
