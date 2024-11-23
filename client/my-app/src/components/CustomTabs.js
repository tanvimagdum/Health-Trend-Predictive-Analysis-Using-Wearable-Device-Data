import React from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import { styled } from '@mui/material/styles';
import FavoriteIcon from '@mui/icons-material/Favorite';
import TimelineIcon from '@mui/icons-material/Timeline';

const StyledTabs = styled(Tabs)(({ theme }) => ({
  '& .MuiTabs-indicator': {
    height: 3,
    borderRadius: 1.5,
  },
}));

const StyledTab = styled(Tab)(({ theme }) => ({
  textTransform: 'none',
  fontWeight: 600,
  fontSize: '1rem',
  marginRight: theme.spacing(4),
  minHeight: 60,
  '&.Mui-selected': {
    color: theme.palette.primary.main,
  },
}));

function CustomTabs({ currentTab, setCurrentTab }) {
  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <StyledTabs
        value={currentTab}
        onChange={(e, newValue) => setCurrentTab(newValue)}
        aria-label="Analysis tabs"
      >
        <StyledTab 
          icon={<FavoriteIcon />} 
          iconPosition="start" 
          label="Heart Rate Analysis" 
        />
        <StyledTab 
          icon={<TimelineIcon />} 
          iconPosition="start" 
          label="Trends" 
        />
      </StyledTabs>
    </Box>
  );
}

export default CustomTabs; 