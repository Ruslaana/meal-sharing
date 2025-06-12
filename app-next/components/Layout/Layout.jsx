'use client';

import React from 'react';
import { CssBaseline, Container } from '@mui/material';
import Footer from '../Footer/Footer';

const Layout = ({ children }) => {
  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ minHeight: '90vh', pt: 2 }}>
        {children}
      </Container>
      <Footer />
    </>
  );
};

export default Layout;
