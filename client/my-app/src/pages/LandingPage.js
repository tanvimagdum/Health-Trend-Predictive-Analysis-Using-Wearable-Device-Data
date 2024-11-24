import React from 'react';
import Logo from '../components/Logo';
import { 
  Box, 
  Button, 
  Container, 
  Typography, 
  Grid,
  Card,
  CardContent,
  useTheme
} from '@mui/material';
import { motion } from 'framer-motion';
import FavoriteIcon from '@mui/icons-material/Favorite';
import TimelineIcon from '@mui/icons-material/Timeline';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import { useNavigate } from 'react-router-dom';
import heroImage from '../assets/fit.jpg';

function LandingPage() {
  const theme = useTheme();
  const navigate = useNavigate();

  const features = [
    {
      icon: <FavoriteIcon sx={{ fontSize: 40, color: '#43BF21' }} />,
      title: 'Heart Rate Analysis',
      description: 'Advanced analytics for heart rate patterns',
      path: '/heart-rate'
    },
    {
      icon: <TimelineIcon sx={{ fontSize: 40, color: '#43BF21' }} />,
      title: 'Trend Tracking',
      description: 'Visualize and monitor long-term health trends and patterns',
      path: '/trends'
    },
    {
      icon: <AnalyticsIcon sx={{ fontSize: 40, color: '#43BF21' }} />,
      title: 'Sleep Patterns',
      description: 'Machine learning algorithms for predictive sleep patterns',
      path: '/sleep'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <Box 
        sx={{ 
          background: 'linear-gradient(135deg, #3366FF 0%, #6690FF 100%)',
          color: 'white',
          pt: 15,
          pb: 8
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ x: -50 }}
                animate={{ x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Logo variant="large" />
                <Typography variant="h5" sx={{ mb: 4, mt: 2, opacity: 0.9 }}>
                Focusing on a Healthier You.
                </Typography>
                <Button 
                  variant="contained" 
                  size="large"
                  onClick={() => navigate('/heart-rate')}
                  sx={{
                    backgroundColor: 'white',
                    color: theme.palette.primary.main,
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    },
                  }}
                >
                  Get Started
                </Button>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={6}>
              <motion.img
                src={heroImage}
                alt="Heart Rate Analysis"
                style={{
                  width: '100%',
                  maxWidth: 500,
                  height: 'auto',
                  borderRadius: '12px',
                  boxShadow: '0 4px 24px rgba(0,0,0,0.15)'
                }}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Card 
                  sx={{ 
                    height: '100%',
                    textAlign: 'center',
                    p: 2,
                    cursor: 'pointer',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      transition: 'transform 0.3s ease-in-out',
                      boxShadow: theme.shadows[4],
                    },
                  }}
                  onClick={() => navigate(feature.path)}
                >
                  <CardContent>
                    <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                    <Typography variant="h6" gutterBottom>
                      {feature.title}
                    </Typography>
                    <Typography color="text.secondary">
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </motion.div>
  );
}

export default LandingPage; 