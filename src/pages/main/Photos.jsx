import { useEffect, useState } from 'react';
import { Box,  Dialog, DialogContent, IconButton, ImageList, ImageListItem, Skeleton, Typography } from '@mui/material';
import { MenuIcon } from '../../icon/MenuIcon';
  
import { API_ENDPOINTS } from '../../utils/Endpoints';
import { ApiRouter } from '../../utils/Api';
  
export default function Photos({ setDrawerOpen }) {
    const [photos, setPhotos] = useState([]);
    const [open, setOpen] = useState(false);
    const [loadedImages, setLoadedImages] = useState({});
    const [selectedPhoto, setSelectedPhoto] = useState(null);
  
    useEffect(() => {
      ApiRouter.get(API_ENDPOINTS.PHOTOS()).then(setPhotos);
    }, []);
  
    const handleOpen = (photo) => {
      setSelectedPhoto(photo);
      setOpen(true);
    };
  
    const handleClose = () => {
      setSelectedPhoto(null);
      setOpen(false);
    };

    const handleImageLoad = (index) => {
        setLoadedImages((prev) => ({ ...prev, [index]: true }));
    };
  
    return (
        <Box sx={{ backgroundColor: 'rgba(5,10,14,1.00)', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'white', p: 3, px: { sm: 4, md: 10 } }}>
            <IconButton sx={{ position: 'absolute', top: { xs: 16, md: 64 }, left: { xs: 16, md: 64 }, color: 'white' }} onClick={setDrawerOpen}>
                <MenuIcon />
            </IconButton>
            <Typography variant="h2" sx={{ textAlign: 'center', mt: 2 }} gutterBottom>
                Photos
            </Typography>
            <ImageList cols={3} gap={8} variant={'masonry'}>
                {photos.map((photo, index) => (
                    <ImageListItem key={index} onClick={() => handleOpen(photo)}>
                        {!loadedImages[index] && (
                            <Skeleton variant="rectangular" width="100%" height={200} />
                        )}
                        <img
                            srcSet={`${photo.image}?w=248&fit=crop&auto=format&dpr=2 2x`}
                            src={`${photo.image}?w=164&fit=crop&auto=format`}
                            alt={photo.alt}
                            loading="lazy"
                            onLoad={() => handleImageLoad(index)}
                            style={{
                                display: loadedImages[index] !== false ? 'block' : 'none',
                                cursor: 'pointer',
                            }}
                        />
                    </ImageListItem>
                ))}
            </ImageList>
            <Dialog open={open} onClose={handleClose} maxWidth="lg">
                <DialogContent sx={{ p: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'black' }}>
                    {selectedPhoto && (
                        <img src={selectedPhoto.image} alt={selectedPhoto.alt} style={{ width: '100%', maxWidth: '90vw', maxHeight: '90vh', objectFit: 'contain' }}/>
                    )}
                </DialogContent>
            </Dialog>
        </Box>
    );
}
  