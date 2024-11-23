import React, { useState } from 'react';
import { ThemeProvider, Box, Container } from '@mui/material';
import { theme } from './theme';
import HeartRateAnalysis from './pages/HeartRateAnalysis';
import Trends from './pages/Trends';
import CustomTabs from './components/CustomTabs';

function App() {
  const [currentTab, setCurrentTab] = useState(0);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', py: 4 }}>
        <Container maxWidth="lg">
          <CustomTabs currentTab={currentTab} setCurrentTab={setCurrentTab} />
          {currentTab === 0 ? <HeartRateAnalysis /> : <Trends />}
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;