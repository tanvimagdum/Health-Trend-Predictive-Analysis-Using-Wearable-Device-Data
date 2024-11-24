import React from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
  Chip,
  useTheme,
  Button,
  Divider,
} from '@mui/material';
import { motion } from 'framer-motion';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const trendData = [
  {
    title: "Daily Heart Rate Patterns",
    description: "24-hour heart rate variation analysis",
    image: "https://placehold.co/800x400/3366FF/FFFFFF/png?text=Daily+Patterns",
    category: "Daily Analysis",
    improvement: "+12%",
    date: "Last 24 hours",
    insights: ["Peak activity at 10 AM", "Resting periods optimal", "Exercise impact positive"]
  },
  {
    title: "Weekly Performance",
    description: "Week-over-week heart rate trends",
    image: "https://placehold.co/800x400/6690FF/FFFFFF/png?text=Weekly+Trends",
    category: "Weekly Analysis",
    improvement: "+8%",
    date: "Last 7 days",
    insights: ["Improved recovery time", "Better sleep quality", "Reduced stress levels"]
  },
  {
    title: "Monthly Overview",
    description: "Long-term cardiovascular health trends",
    image: "https://placehold.co/800x400/8DE8F2/FFFFFF/png?text=Monthly+Overview",
    category: "Monthly Analysis",
    improvement: "+15%",
    date: "Last 30 days",
    insights: ["Consistent improvement", "Healthy variability", "Optimal patterns"]
  }
];

function TrendCard({ trend, index }) {
  const theme = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card
        elevation={0}
        sx={{
          height: '100%',
          borderRadius: 3,
          '&:hover': {
            transform: 'translateY(-4px)',
            transition: 'transform 0.3s ease-in-out',
            boxShadow: theme.shadows[4],
          },
        }}
      >
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Chip
              label={trend.category}
              size="small"
              color="primary"
              sx={{ borderRadius: 1 }}
            />
            <IconButton size="small">
              <MoreVertIcon />
            </IconButton>
          </Box>
          
          <Box
            sx={{
              position: 'relative',
              borderRadius: 2,
              overflow: 'hidden',
              mb: 3,
              bgcolor: 'grey.50',
            }}
          >
            <img
              src={trend.image}
              alt={trend.title}
              style={{
                width: '100%',
                height: '200px',
                objectFit: 'cover',
              }}
            />
          </Box>

          <Typography variant="h6" gutterBottom>
            {trend.title}
          </Typography>
          
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {trend.description}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <CalendarTodayIcon sx={{ fontSize: 20, color: 'text.secondary', mr: 1 }} />
            <Typography variant="body2" color="text.secondary">
              {trend.date}
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Chip
              icon={<TrendingUpIcon />}
              label={trend.improvement}
              size="small"
              color="success"
              sx={{ borderRadius: 1 }}
            />
          </Box>

          <Divider sx={{ my: 2 }} />

          <Typography variant="subtitle2" gutterBottom>
            Key Insights:
          </Typography>
          {trend.insights.map((insight, i) => (
            <Typography 
              key={i} 
              variant="body2" 
              color="text.secondary"
              sx={{ 
                display: 'flex', 
                alignItems: 'center',
                mb: 0.5 
              }}
            >
              • {insight}
            </Typography>
          ))}

          <Button 
            fullWidth 
            variant="outlined" 
            color="primary"
            sx={{ mt: 2 }}
          >
            View Detailed Analysis
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function Trends() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" sx={{ mb: 1, fontWeight: 600 }}>
          Trend Analysis Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Monitor your heart health patterns and track improvements over time
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {trendData.map((trend, index) => (
          <Grid item xs={12} md={6} lg={4} key={index}>
            <TrendCard trend={trend} index={index} />
          </Grid>
        ))}
      </Grid>
    </motion.div>
  );
}

export default Trends;