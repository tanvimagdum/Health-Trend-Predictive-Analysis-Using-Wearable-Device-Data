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
} from '@mui/material';
import { motion } from 'framer-motion';
import SearchIcon from '@mui/icons-material/Search';
import DownloadIcon from '@mui/icons-material/Download';
import FullscreenIcon from '@mui/icons-material/Fullscreen';

function HeartRateAnalysis() {
  const theme = useTheme();
  const [userId, setUserId] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPlots, setShowPlots] = useState(false);

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
      <Card
        sx={{
          mb: 4,
          background: 'linear-gradient(135deg, #3366FF 0%, #6690FF 100%)',
          color: 'white',
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
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
                      '& fieldset': {
                        borderColor: 'transparent',
                      },
                      '&:hover fieldset': {
                        borderColor: 'transparent',
                      },
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

      {showPlots && (
        <Grid container spacing={3}>
          {['Linear Regression', 'Random Forest'].map((model, index) => (
            <Grid item xs={12} md={6} key={model}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <Card sx={{ height: '100%' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                      <Typography variant="h6" color="primary">
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
                        src={`/images/${model.toLowerCase().replace(' ', '-')}.jpg`}
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
                      <Typography variant="body2" color="text.secondary">
                        Confidence Score: 95%
                      </Typography>
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
      )}
    </motion.div>
  );
}

export default HeartRateAnalysis;