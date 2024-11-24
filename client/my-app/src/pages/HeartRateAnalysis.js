import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Grid,
  Paper,
  Typography,
  CircularProgress,
  Card,
  CardContent,
  IconButton,
  useTheme,
  Chip,
  Divider,
} from '@mui/material';
import { motion } from 'framer-motion';
import SearchIcon from '@mui/icons-material/Search';
import DownloadIcon from '@mui/icons-material/Download';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FavoriteIcon from '@mui/icons-material/Favorite';
import TimerIcon from '@mui/icons-material/Timer';
import SpeedIcon from '@mui/icons-material/Speed';

function HeartRateAnalysis() {
  const theme = useTheme();
  const [userId, setUserId] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPlots, setShowPlots] = useState(false);

  const metrics = [
    {
      title: "Average BPM",
      value: "72",
      change: "+2.5%",
      icon: <FavoriteIcon sx={{ color: theme.palette.error.main }} />,
      color: theme.palette.error.main
    },
    {
      title: "Recovery Time",
      value: "2.3h",
      change: "-15min",
      icon: <TimerIcon sx={{ color: theme.palette.success.main }} />,
      color: theme.palette.success.main
    },
    {
      title: "Heart Rate Variability",
      value: "45ms",
      change: "+3ms",
      icon: <SpeedIcon sx={{ color: theme.palette.info.main }} />,
      color: theme.palette.info.main
    }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setShowPlots(true);
    setLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Search Section */}
      <Card
        elevation={0}
        sx={{
          mb: 4,
          background: 'linear-gradient(135deg, #3366FF 0%, #6690FF 100%)',
          color: 'white',
          borderRadius: 3,
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ mb: 3, fontWeight: 600 }}>
            Heart Rate Analysis Dashboard
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={8}>
                <TextField
                  fullWidth
                  placeholder="Enter User ID to analyze heart rate patterns"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  disabled={loading}
                  sx={{
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    borderRadius: 2,
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': { borderColor: 'transparent' },
                      '&:hover fieldset': { borderColor: 'transparent' },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <Button
                  fullWidth
                  size="large"
                  variant="contained"
                  type="submit"
                  disabled={loading}
                  sx={{
                    height: 56,
                    backgroundColor: 'white',
                    color: theme.palette.primary.main,
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    },
                  }}
                  startIcon={loading ? <CircularProgress size={20} /> : <SearchIcon />}
                >
                  {loading ? 'Analyzing...' : 'Generate Analysis'}
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>

      {/* Metrics Section */}
      {showPlots && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Grid container spacing={3} sx={{ mb: 4 }}>
            {metrics.map((metric, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card elevation={0} sx={{ borderRadius: 3 }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Box
                        sx={{
                          p: 1,
                          borderRadius: 2,
                          backgroundColor: `${metric.color}15`,
                          mr: 2
                        }}
                      >
                        {metric.icon}
                      </Box>
                      <Typography variant="h6" color="text.secondary">
                        {metric.title}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'baseline' }}>
                      <Typography variant="h4" sx={{ mr: 2, fontWeight: 600 }}>
                        {metric.value}
                      </Typography>
                      <Chip
                        label={metric.change}
                        size="small"
                        color={metric.change.includes('+') ? 'success' : 'error'}
                        sx={{ height: 24 }}
                      />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Analysis Plots */}
          <Grid container spacing={3}>
            {['Linear Regression', 'Random Forest'].map((model, index) => (
              <Grid item xs={12} md={6} key={model}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.2 }}
                >
                  <Card elevation={0} sx={{ borderRadius: 3 }}>
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                        <Typography variant="h6" color="primary" sx={{ fontWeight: 600 }}>
                          {model} Analysis
                        </Typography>
                        <Box>
                          <IconButton size="small">
                            <DownloadIcon />
                          </IconButton>
                          <IconButton size="small">
                            <FullscreenIcon />
                          </IconButton>
                        </Box>
                      </Box>
                      <Paper
                        elevation={0}
                        sx={{
                          p: 2,
                          bgcolor: 'grey.50',
                          borderRadius: 2,
                          overflow: 'hidden',
                        }}
                      >
                        <img
                          src={`https://placehold.co/800x400/3366FF/FFFFFF/png?text=${model}`}
                          alt={`${model} Analysis`}
                          style={{
                            width: '100%',
                            height: 'auto',
                            display: 'block',
                            borderRadius: theme.shape.borderRadius,
                          }}
                        />
                      </Paper>
                      <Box sx={{ mt: 2 }}>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                          Confidence Score: 95%
                        </Typography>
                        <Divider sx={{ my: 1 }} />
                        <Typography variant="body2" color="text.secondary">
                          Last Updated: {new Date().toLocaleDateString()}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      )}
    </motion.div>
  );
}

export default HeartRateAnalysis;