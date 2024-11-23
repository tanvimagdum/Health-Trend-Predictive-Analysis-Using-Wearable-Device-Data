import { AppBar, Tabs, Tab, Box } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (event, newValue) => {
    navigate(newValue);
  };

  return (
    <Box sx={{ mb: 4 }}>
      <AppBar position="static">
        <Tabs 
          value={location.pathname} 
          onChange={handleChange}
          centered
        >
          <Tab label="Heart Rate Analysis" value="/" />
          <Tab label="Trends" value="/trends" />
        </Tabs>
      </AppBar>
    </Box>
  );
}

export default Navigation; 