import React from 'react';
import { Box, Typography, Fade } from '@mui/material';

function CreditsFooter() {
  return (
    <Fade in timeout={900}>
      <Box sx={{ width: '100%', py: 2, px: 2, background: 'linear-gradient(90deg, #1976d2 60%, #21cbf3 100%)', color: 'white', boxShadow: '0 -2px 16px #1976d220', position: 'relative', zIndex: 1200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="body1" sx={{ fontWeight: 500, letterSpacing: 1, display: 'inline-flex', alignItems: 'center', gap: 1, textAlign: 'center' }}>
          Made with <span style={{ color: '#ff4081', margin: '0 6px' }}>❤</span> by Maroof
        </Typography>
      </Box>
    </Fade>
  );
}

export default CreditsFooter; 