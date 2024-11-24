import React, { useState } from 'react';
import { Container } from '@mui/material';
import CustomTabs from '../components/CustomTabs';
import HeartRateAnalysis from './HeartRateAnalysis';
import Trends from './Trends';

function Dashboard() {
  const [currentTab, setCurrentTab] = useState(0);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <CustomTabs currentTab={currentTab} setCurrentTab={setCurrentTab} />
      {currentTab === 0 ? <HeartRateAnalysis /> : <Trends />}
    </Container>
  );
}

export default Dashboard; 