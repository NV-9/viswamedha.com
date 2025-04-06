import React, { useState, useEffect } from 'react';
import { Box, Grid2 as Grid, Chip, Typography, IconButton, Divider, Button, Select, MenuItem } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import DOMPurify from 'dompurify';
import { marked } from 'marked';
import { MenuIcon } from '../../icon/MenuIcon';
import { useNavigate } from 'react-router-dom';
import { API_ENDPOINTS } from '../../utils/Endpoints';
import { ApiRouter } from '../../utils/Api';
import { mapping } from '../../utils/Mapping';
import { formatDate } from '../../utils/Helpers';

function getShort(markdown, limit = 100) {
    if (!markdown) return '';
    const html = DOMPurify.sanitize(marked.parse(markdown));
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    const plainText = tempDiv.textContent || tempDiv.innerText || '';
    return plainText.length > limit
        ? `${plainText.substring(0, limit)}...`
        : plainText;
}

export default function Blog({ setDrawerOpen }) {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [tags, setTags] = useState([]);
    const [selectedTag, setSelectedTag] = useState(null);
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    useEffect(() => {
        ApiRouter.get(API_ENDPOINTS.POSTS()).then(setPosts);
        ApiRouter.get(API_ENDPOINTS.TAGS()).then((data) => data.sort((a, b) => a.name.localeCompare(b.name))).then(setTags);

        const handleResize = () => setIsSmallScreen(window.innerWidth <= 600);
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleTagChange = (event) => setSelectedTag(event.target.value || null);
    const handleTagClick = (name) => setSelectedTag(name === selectedTag ? null : name);

    const filteredPosts = (selectedTag
        ? posts.filter(post => post.tags.some(tag => tag.name === selectedTag))
        : posts
    ).sort((a, b) => new Date(b.publish_date) - new Date(a.publish_date));

    return (
        <Box sx={{ backgroundColor: 'rgba(5,10,14,1.00)', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'white', p: 2, px: { xs: 2, sm: 2, md: 10, lg: 10} }}>
            <IconButton sx={{ position: 'absolute', top: { xs: 16, md: 64 }, left: { xs: 16, md: 64 }, color: 'white' }} onClick={setDrawerOpen}>
                <MenuIcon />
            </IconButton>
            <Typography variant="h2" align="center" sx={{ mt: 5 }} gutterBottom>
                Blog
            </Typography>
            <Typography variant="body1" align="center" sx={{ mb: 4 }}>
                This is a collection of random pieces of information, stories, and experiences I have encountered/experienced.
            </Typography>
            
            <Grid container direction="column" spacing={4} sx={{ width: '100%', maxWidth: { xs: '100%', sm: '95%', md: '90%', lg: '85%', xl: '80%' }}}>
                {isSmallScreen ? (
                    <Select value={selectedTag || ''} onChange={handleTagChange} displayEmpty fullWidth sx={{ mb: 4, color: 'white', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 1 }}>
                        <MenuItem key="All Tags" value="">
                            <em>All Tags</em>
                        </MenuItem>
                        {tags.map((tag) => (
                            <MenuItem key={tag.name} value={tag.name}>
                                {tag.name}
                            </MenuItem>
                        ))}
                    </Select>
                ) : (
                    <Box sx={{ mb: 4, width: '100%', display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                        {tags.map((tag) => (
                            <Button key={tag.name} variant={tag.name === selectedTag ? 'contained' : 'outlined'} sx={{ color: 'white', ml: 2, mb: 2 }} onClick={() => handleTagClick(tag.name)}>
                                {tag.name}
                            </Button>
                        ))}
                    </Box>
                )}
                {filteredPosts.map((post, index) => (
                    <React.Fragment key={index}>
                        <Grid container direction="column" spacing={2} sx={{ position: 'relative' }}>
                            <Grid item="true" xs={12}>
                                <Button variant="outlined" sx={{ color: 'white', mb: 1 }} color="white">
                                    {formatDate(post.publish_date)}
                                </Button>
                                <Typography variant="h5" sx={{ mb: 1 }}>
                                    {post.heading}
                                </Typography>
                                <Typography variant="body1" sx={{ mb: 1 }} >
                                    {getShort(post.content, 100)}
                                </Typography>
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 1 }}>
                                    {post.tags.map((tag) => (
                                        <Chip key={tag.name} label={tag.name} variant="outlined" sx={{ color: 'white' }} />
                                    ))}
                                </Box>
                                <Button onClick={() => navigate(mapping['Post'].getPath(post.slug))} sx={{ color: '#fdf800', display: 'flex', alignItems: 'center' }} endIcon={<ArrowForwardIcon sx={{ color: '#fdf800' }} />}>
                                    Read more
                                </Button>
                            </Grid>
                            <Grid item="true" xs={12}>
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '200px', overflow: 'hidden', borderRadius: 1,}}>
                                    <Box component="img" src={post.image} alt={post.title} sx={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 1 }}/>
                                </Box>
                            </Grid>
                        </Grid>
                        {index < filteredPosts.length - 1 && (
                            <Divider sx={{ width: '100%', backgroundColor: 'rgba(0,240,255,1.00)', mt: 2, mb: 2 }} />
                        )}
                    </React.Fragment>
                ))}
            </Grid>
            <Grid container direction="column" spacing={4} sx={{ width: '100%', maxWidth: { xs: '100%', sm: '95%', md: '90%', lg: '85%', xl: '80%' } }}>
                <Divider sx={{ width: '100%', backgroundColor: 'rgba(248, 253, 0, 1.00)', my: 2 }} />
                <Typography variant="body2" align="center" sx={{ mt: 2, color: 'rgba(255, 255, 255, 0.6)' }}>
                    © {new Date().getFullYear()} Viswamedha Nalabotu
                </Typography>
            </Grid>
        </Box>
    );
}
