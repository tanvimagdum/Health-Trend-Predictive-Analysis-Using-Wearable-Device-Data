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
} from '@mui/material';
import { motion } from 'framer-motion';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

const trendData = [
  {
    title: "Daily Heart Rate Patterns",
    description: "24-hour heart rate variation analysis",
    image: "/images/trend1.jpg",
    category: "Daily Analysis",
    improvement: "+12%",
  },
  // ... add more trend data
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
        sx={{
          height: '100%',
          '&:hover': {
            transform: 'translateY(-4px)',
            transition: 'transform 0.3s ease-in-out',
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
              mb: 2,
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
            <Box
              sx={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                p: 2,
                background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
                color: 'white',
              }}
            >
              <Typography variant="h6">{trend.title}</Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="body2" color="text.secondary">
              {trend.description}
            </Typography>
            <Chip
              icon={<TrendingUpIcon />}
              label={trend.improvement}
              size="small"
              color="success"
              sx={{ borderRadius: 1 }}
            />
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function Trends() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 4 }}>
        Trend Analysis Dashboard
      </Typography>
      <Grid container spacing={3}>
        {trendData.map((trend, index) => (
          <Grid item xs={12} md={6} lg={4} key={index}>
            <TrendCard trend={trend} index={index} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Trends;