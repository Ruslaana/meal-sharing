'use client';

import React from 'react';
import { Box, Typography, Link } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        textAlign: 'center',
        backgroundColor: '#fff3e0',
        borderTop: '2px solid #ffccbc',
      }}
    >
      <Typography
        variant="body2"
        sx={{
          fontFamily: 'Inter, sans-serif',
          color: '#f48fb1',
          mb: 1,
        }}
      >
        Meal Sharing App © {new Date().getFullYear()}
      </Typography>
      <Typography variant="caption" sx={{ color: '#999' }}>
        Made with 🍽️ & ❤️ by you
      </Typography>
    </Box>
  );
};

export default Footer;
