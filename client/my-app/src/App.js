import React from 'react';
import { ThemeProvider, Box, Container, Typography } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { theme } from './theme';
import LandingPage from './pages/LandingPage';
import Navigation from './components/Navigation';
import HeartRateAnalysis from './pages/HeartRateAnalysis';
import Trends from './pages/Trends';
import SleepAnalysis from './pages/SleepAnalysis';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route
              path="/heart-rate"
              element={
                <>
                  <Navigation />
                  <Container maxWidth="lg" sx={{ py: 4 }}>
                    <HeartRateAnalysis />
                  </Container>
                </>
              }
            />
            <Route
              path="/trends"
              element={
                <>
                  <Navigation />
                  <Container maxWidth="lg" sx={{ py: 4 }}>
                    <Trends />
                  </Container>
                </>
              }
            />
            <Route
              path="/sleep"
              element={
                <>
                  <Navigation />
                  <Container maxWidth="lg" sx={{ py: 4 }}>
                    <SleepAnalysis />
                  </Container>
                </>
              }
            />
          </Routes>
        </Box>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;