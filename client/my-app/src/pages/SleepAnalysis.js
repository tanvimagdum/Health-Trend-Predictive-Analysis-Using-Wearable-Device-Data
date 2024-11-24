import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  CircularProgress,
  Button,
} from '@mui/material';
import { motion } from 'framer-motion';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import BedtimeIcon from '@mui/icons-material/Bedtime';
import TimerIcon from '@mui/icons-material/Timer';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

// Dummy data for the sleep pattern graph
const generateDummyData = () => {
  const data = [];
  for (let i = 0; i < 7; i++) {
    data.push({
      day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i],
      'Deep Sleep': Math.random() * 3 + 2, // 2-5 hours
      'Light Sleep': Math.random() * 4 + 3, // 3-7 hours
      'REM Sleep': Math.random() * 2 + 1, // 1-3 hours
    });
  }
  return data;
};

function SleepAnalysis() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  // Simulate loading data from backend
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setData(generateDummyData());
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const sleepMetrics = [
    {
      icon: <BedtimeIcon />,
      label: 'Average Sleep Duration',
      value: '7h 15m',
      trend: '+45m from last week',
      color: '#8DE8F2'
    },
    {
      icon: <TimerIcon />,
      label: 'Sleep Quality Score',
      value: '85%',
      trend: '+5% from last week',
      color: '#FF4757'
    },
    {
      icon: <TrendingUpIcon />,
      label: 'Deep Sleep Ratio',
      value: '32%',
      trend: '+3% from last week',
      color: '#3366FF'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Metrics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {sleepMetrics.map((metric, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box
                    sx={{
                      backgroundColor: `${metric.color}15`,
                      borderRadius: '50%',
                      p: 1,
                      mr: 2,
                      color: metric.color
                    }}
                  >
                    {metric.icon}
                  </Box>
                  <Typography variant="h6">{metric.label}</Typography>
                </Box>
                <Typography variant="h4" sx={{ mb: 1 }}>
                  {metric.value}
                </Typography>
                <Chip
                  label={metric.trend}
                  size="small"
                  icon={<TrendingUpIcon />}
                  color="success"
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Sleep Pattern Graph */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Weekly Sleep Pattern Analysis
          </Typography>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
              <CircularProgress />
            </Box>
          ) : (
            <Box sx={{ height: 400, mt: 2 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis label={{ value: 'Hours', angle: -90, position: 'insideLeft' }} />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="Deep Sleep" 
                    stroke="#3366FF" 
                    strokeWidth={2} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="Light Sleep" 
                    stroke="#8DE8F2" 
                    strokeWidth={2} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="REM Sleep" 
                    stroke="#FF4757" 
                    strokeWidth={2} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          )}
        </CardContent>
      </Card>

      {/* Analysis Description */}
      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Sleep Analysis Insights
          </Typography>
          <Typography paragraph>
            Based on your weekly sleep patterns, we've observed consistent improvements in your sleep quality. 
            Your deep sleep duration has increased by 8% compared to last week, indicating better rest and recovery.
          </Typography>
          <Typography paragraph>
            Key Observations:
          </Typography>
          <ul>
            <Typography component="li">Optimal sleep duration achieved on 5 out of 7 days</Typography>
            <Typography component="li">Deep sleep cycles show improvement during weekdays</Typography>
            <Typography component="li">REM sleep patterns indicate healthy stress management</Typography>
          </ul>
          <Box sx={{ mt: 2 }}>
            <Button 
              variant="contained" 
              color="primary"
              onClick={() => {/* Handle detailed report generation */}}
            >
              Generate Detailed Report
            </Button>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default SleepAnalysis; 